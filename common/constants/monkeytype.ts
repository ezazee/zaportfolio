export const MONKEYTYPE_ACCOUNT = {
  username: process.env.NEXT_PUBLIC_MONKEYTYPE_USERNAME,
  api_key: process.env.MONKEYTYPE_API_KEY,
  endpoint: "/api/monkeytype",
  monkeytype_url: `https://monkeytype.com/profile/${process.env.NEXT_PUBLIC_MONKEYTYPE_USERNAME}`,
  is_active: true,
};
