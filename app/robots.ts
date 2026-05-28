import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
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
