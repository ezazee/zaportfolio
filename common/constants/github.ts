export const GITHUB_ACCOUNTS = {
  username: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  token: process.env.GITHUB_READ_USER_TOKEN_PERSONAL,
  endpoint: "/api/github",
  type: "personal",
  github_url: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
  is_active: true,
};
