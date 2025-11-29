/**
 * Cloudflare Worker for Geo IP Detection
 * 
 * This worker detects the visitor's country code using Cloudflare's request.cf.country.
 * Returns JSON: { "country": "XX" }
 * 
 * Configuration:
 * - Deploy this worker to Cloudflare Workers
 * - Set up a route (e.g., /geo or /api/geo-country) to this worker
 * - No API keys or paid services required - uses Cloudflare's free tier
 */

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // Get country code from Cloudflare's request object
      // request.cf.country is available on Cloudflare Workers
      const country = request.cf?.country || 'UNKNOWN';

      return new Response(
        JSON.stringify({ country }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );
    } catch (error) {
      // If there's an error, return a safe default (no blocking)
      return new Response(
        JSON.stringify({ country: 'UNKNOWN', error: 'Detection failed' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};



