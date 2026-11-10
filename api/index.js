// Vercel Serverless Function entry point
// In Vercel cloud environment:
// If SUPABASE_URL is configured, the application operates in full cloud database mode.
// If SUPABASE_URL is not yet configured, DEMO_MODE protects against native SQLite binaries.
process.env.VERCEL = '1';

if (!process.env.SUPABASE_URL) {
  process.env.DEMO_MODE = 'true';
}

const app = require('../server');

module.exports = app;
