// Vercel Serverless Function entry point
// Automatically activates DEMO_MODE so the native SQLite binary is never loaded on Vercel
process.env.DEMO_MODE = 'true';
process.env.VERCEL = '1';

const app = require('../server');

module.exports = app;
