/**
 * Geo Blocking Utility
 * 
 * Configuration:
 * - BLOCKED_COUNTRIES: Array of country codes to block (ISO 3166-1 alpha-2)
 *   To add more countries, add their codes to this array.
 * 
 * - CHINA_SITE_URL: The URL to redirect blocked users to
 *   To change the redirect URL, modify this constant.
 * 
 * - GEO_ENDPOINT: The endpoint URL for geo detection
 *   Update this to match your deployed Cloudflare Worker route
 */

// List of blocked country codes (ISO 3166-1 alpha-2)
// To block additional countries, add their codes here
export const BLOCKED_COUNTRIES = ['CN'] as const;

// China site URL for redirection
// To change the redirect URL, modify this value
export const CHINA_SITE_URL = 'https://granoflow.cn';

// Geo detection endpoint
// 两种方式：
// 方式 1（推荐，无需配置路由）：直接使用 Worker 的默认 URL
//   部署 Worker 后，Cloudflare 会自动分配一个 URL，格式如：
//   'https://granoflow-geo-country.your-subdomain.workers.dev'
//   直接复制这个 URL 到这里即可，不需要配置任何路由
//
// 方式 2（可选）：如果网站也在 Cloudflare 上，可以配置路由使用相对路径
//   - '/geo' (配置路由后使用)
//   - '/api/geo-country' (配置路由后使用)
//
// 默认使用方式 1，部署 Worker 后更新为实际的 Worker URL
export const GEO_ENDPOINT = '/geo'; // 部署后改为 Worker 的完整 URL，例如：'https://granoflow-geo-country.xxx.workers.dev'

/**
 * Detects the visitor's country code
 * @returns Promise<string> Country code (e.g., 'CN', 'US') or 'UNKNOWN' on error
 */
export async function detectCountry(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(GEO_ENDPOINT, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Geo detection endpoint returned non-OK status:', response.status);
      return 'UNKNOWN';
    }

    const data = await response.json();
    const country = data?.country || 'UNKNOWN';

    return country;
  } catch (error) {
    // Graceful degradation: if detection fails, don't block
    console.warn('Geo detection failed, defaulting to no blocking:', error);
    return 'UNKNOWN';
  }
}

/**
 * Checks if a country code is blocked
 * @param country Country code to check
 * @returns boolean True if the country is blocked
 */
export function isCountryBlocked(country: string): boolean {
  return BLOCKED_COUNTRIES.includes(country as typeof BLOCKED_COUNTRIES[number]);
}

/**
 * Redirects to the China site
 */
export function redirectToChinaSite(): void {
  window.location.href = CHINA_SITE_URL;
}

