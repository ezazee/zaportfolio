import { MetadataRoute } from "next";

const DOMAIN = process.env.DOMAIN || "https://zaportfolio.vercel.app";
const LOCALES = ["id", "en"];

const PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/achievements", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/links", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/legal/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/legal/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: `${DOMAIN}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
  );
}
