import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
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
      : process.env.DOMAIN || "",
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: METADATA.profile,
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
  const avatarUrl = process.env.NEXT_PUBLIC_AVATAR_URL || `${domain}/images/avatar.jpg`;
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
        description:
          "Freelance Web Developer Indonesia spesialis React.js, Next.js, dan Tailwind CSS. Berbasis di Jakarta, Indonesia.",
        knowsAbout: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Laravel", "PHP", "Web Development"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        sameAs: [githubUrl, linkedinUrl, instagramUrl].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: domain,
        name: "Zaportfolio",
        description: "Portfolio website Mohamad Reza Reziyanto — Freelance Web Developer Indonesia",
        publisher: { "@id": `${domain}/#person` },
        inLanguage: ["id", "en"],
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="2caecb33-2ab9-4aad-a30c-feaa0c1e0136"
        />
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
      </body>
    </html>
  );
};

export default RootLayout;
