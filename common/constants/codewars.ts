export const CODEWARS_ACCOUNT = {
  user_id: process.env.CODEWARS_USER_ID,
  username: process.env.NEXT_PUBLIC_CODEWARS_USERNAME,
  endpoint: "/api/codewars",
  codewars_url: `https://www.codewars.com/users/${process.env.NEXT_PUBLIC_CODEWARS_USERNAME}`,
  is_active: true,
};
