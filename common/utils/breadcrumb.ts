const domain = process.env.DOMAIN || "https://zaportfolio.my.id";

export function getBreadcrumbJsonLd(locale: string, page: { name: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${domain}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.name,
        item: `${domain}/${locale}${page.path}`,
      },
    ],
  };
}
