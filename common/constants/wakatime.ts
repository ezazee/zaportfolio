export const WAKATIME_ACCOUNT = {
  username: process.env.NEXT_PUBLIC_WAKATIME_USERNAME,
  api_key: process.env.WAKATIME_API_KEY,
  stats_endpoint: "/stats",
  all_time_endpoint: "/all_time_since_today",
  base_url: "https://wakatime.com/api/v1/users/current",
  wakatime_url: `https://wakatime.com/@${process.env.NEXT_PUBLIC_WAKATIME_USERNAME}`,
  is_active: true,
};
