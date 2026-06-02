import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";

import Layouts from "@/common/components/layouts";
import ThemeProviderContext from "@/common/stores/theme";
import NextAuthProvider from "@/SessionProvider";
import { METADATA } from "@/common/constants/metadata";
import { inter } from "@/common/styles/fonts";
import SkeletonThemeProvider from "@/SkeletonThemeProvider";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/common/components/elements/CustomCursor";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.DOMAIN || "https://zaportfolio.my.id",
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: [
      {
        url: METADATA.profile,
        width: 1200,
        height: 630,
        alt: "Mohamad Reza Reziyanto — Freelance Web Developer Indonesia",
      },
    ],
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${METADATA.creator} ${METADATA.exTitle}`,
    description: METADATA.description,
    images: [METADATA.profile],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/favicon/favicon.ico",
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
  verification: {
    google: "bL2H8AMdobZW-OHfBm4kzOov3UJLVngITxzqVZJwKyo",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const RootLayout = async ({
  children,
  params,
}: RootLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const session = await getServerSession();

  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const avatarUrl = process.env.NEXT_PUBLIC_AVATAR_URL || `${domain}/images/reza.jpg`;
  const githubUrl = `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || ""}`;
  const linkedinUrl = process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "";
  const instagramUrl = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${domain}/#person`,
        name: "Mohamad Reza Reziyanto",
        url: domain,
        image: avatarUrl,
        jobTitle: "Freelance Web Developer",
        description: "Freelance Web Developer Indonesia spesialis React.js, Next.js, dan Tailwind CSS. Berbasis di Jakarta, Indonesia.",
        knowsAbout: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Laravel", "PHP", "PostgreSQL", "Web Development", "UI/UX"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressRegion: "DKI Jakarta",
          addressCountry: "ID",
        },
        sameAs: [githubUrl, linkedinUrl, instagramUrl].filter(Boolean),
        worksFor: { "@id": `${domain}/#service` },
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: domain,
        name: "Zaportfolio",
        description: "Portfolio website Mohamad Reza Reziyanto — Freelance Web Developer Indonesia",
        publisher: { "@id": `${domain}/#person` },
        inLanguage: ["id", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: `${domain}/en/projects?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${domain}/#service`,
        name: "Jasa Web Development — Mohamad Reza Reziyanto",
        url: domain,
        image: avatarUrl,
        description: "Jasa pembuatan website profesional menggunakan React.js, Next.js, dan Tailwind CSS. Melayani pembuatan website company profile, landing page, toko online, dan aplikasi web untuk bisnis di seluruh Indonesia.",
        telephone: process.env.NEXT_PUBLIC_AUTHOR_PHONE || "",
        priceRange: "Rp 500.000 - Rp 15.000.000",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressRegion: "DKI Jakarta",
          addressCountry: "ID",
        },
        provider: { "@id": `${domain}/#person` },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        serviceType: ["Pembuatan Website", "Web Development", "Frontend Development", "Fullstack Development"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Layanan Web Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Company Profile" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce Website" } },
          ],
        },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <link rel="preconnect" href="https://cdn.discordapp.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://api.monkeytype.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="2caecb33-2ab9-4aad-a30c-feaa0c1e0136"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SXJP42TN9C"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SXJP42TN9C');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <NextTopLoader
          color="#fbe400"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #fbe400,0 0 5px #ffffb8"
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NextAuthProvider session={session}>
            <ThemeProviderContext>
              <SkeletonThemeProvider>
                <CustomCursor />
                <Layouts>{children}</Layouts>
              </SkeletonThemeProvider>
            </ThemeProviderContext>
          </NextAuthProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
