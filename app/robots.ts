import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.DOMAIN || "https://zaportfolio.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*/dashboard", "/*/chat", "/*/smart-talk", "/api/"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
