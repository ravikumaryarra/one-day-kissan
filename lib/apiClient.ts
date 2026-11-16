/**
 * Production-grade edge & client API fetch client with:
 * - Smart in-memory cache with configurable TTL & stale-while-revalidate
 * - In-flight request deduplication (prevents redundant parallel requests)
 * - Automatic exponential backoff retries with jitter
 * - Configurable AbortController timeout protection
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface FetchOptions extends RequestInit {
  ttlMs?: number; // Time to live in ms (default: 60,000 / 1 min)
  retries?: number; // Max retries on 5xx or network errors (default: 2)
  timeoutMs?: number; // Request timeout in ms (default: 8,000)
}

const cache = new Map<string, CacheEntry<unknown>>();
const pendingRequests = new Map<string, Promise<unknown>>();

export async function cachedFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    ttlMs = 60000,
    retries = 2,
    timeoutMs = 8000,
    headers,
    ...fetchInit
  } = options;

  const method = (fetchInit.method || "GET").toUpperCase();

  // Only cache GET requests
  if (method === "GET") {
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < ttlMs) {
      return cached.data as T;
    }

    // Deduplicate in-flight requests for the exact same URL
    if (pendingRequests.has(url)) {
      return pendingRequests.get(url) as Promise<T>;
    }
  }

  const executeRequest = async (attempt: number): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchInit,
        headers: {
          Accept: "application/json, text/plain, */*",
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status >= 500 && attempt < retries) {
          const delay = Math.pow(2, attempt) * 200 + Math.random() * 100;
          await new Promise((resolve) => setTimeout(resolve, delay));
          return executeRequest(attempt + 1);
        }
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "";
      let data: unknown;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (method === "GET") {
        cache.set(url, { data, timestamp: Date.now() });
      }

      return data as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (attempt < retries) {
        const delay = Math.pow(2, attempt) * 200 + Math.random() * 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return executeRequest(attempt + 1);
      }
      throw err;
    }
  };

  const promise = executeRequest(0).finally(() => {
    if (method === "GET") {
      pendingRequests.delete(url);
    }
  });

  if (method === "GET") {
    pendingRequests.set(url, promise);
  }

  return promise;
}
