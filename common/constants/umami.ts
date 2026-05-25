export const UMAMI_ACCOUNT = {
  username: process.env.NEXT_PUBLIC_UMAMI_USERNAME,
  api_key: process.env.UMAMI_API_KEY,
  base_url: "https://api.umami.is/v1/websites",
  endpoint: {
    page_views: "/pageviews",
    sessions: "/sessions/stats",
  },
  parameters: {
    startAt: 1717174800000, // 1 Juni 2024 00:00 WIB
    endAt: Date.now(),
    unit: "month",
    timezone: "Asia/Jakarta",
  },
  is_active: true,
  websites: [
    {
      domain: process.env.NEXT_PUBLIC_UMAMI_DOMAIN,
      website_id: process.env.UMAMI_WEBSITE_ID_SITE,
      umami_url: process.env.NEXT_PUBLIC_UMAMI_SHARE_URL,
    },
  ],
};
