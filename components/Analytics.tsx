"use client";

import Script from "next/script";

export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "").trim();
export const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();

// Security Validation: Ensure IDs contain only alphanumeric characters to prevent injection
const isValidGaId = /^[A-Za-z0-9_-]+$/.test(GA_ID);
const isValidPixelId = /^[0-9]+$/.test(META_PIXEL_ID);

// Custom Event Dispatcher for GA4 & Meta Pixel
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;

  // Google Analytics 4 Event
  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }

  // Meta (Facebook) Pixel Event
  if ((window as any).fbq) {
    (window as any).fbq("trackCustom", eventName, params);
  }
};

// Pre-defined High-Value Conversion Events
export const trackWhatsAppBooking = (visitType: string, farm: string, headcount?: string) => {
  trackEvent("generate_lead", {
    category: "Booking",
    visit_type: visitType,
    preferred_farm: farm,
    headcount: headcount || "unspecified",
  });

  if ((window as any).fbq) {
    (window as any).fbq("track", "Lead", {
      content_name: `${visitType} Visit - ${farm}`,
      currency: "INR",
    });
  }
};

export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent("contact_phone_click", {
    phone: phoneNumber,
  });

  if ((window as any).fbq) {
    (window as any).fbq("track", "Contact");
  }
};

export const track360Interaction = (farmName: string, action: string) => {
  trackEvent("virtual_tour_interaction", {
    farm: farmName,
    interaction_type: action,
  });
};

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      {isValidGaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(GA_ID)}, {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {isValidPixelId && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${JSON.stringify(META_PIXEL_ID)});
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
