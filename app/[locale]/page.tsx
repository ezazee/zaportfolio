import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import Home from "@/modules/home";
import { METADATA } from "@/common/constants/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const description = locale === "id"
    ? "Freelance Web Developer Indonesia spesialis React.js, Next.js & Tailwind CSS. Jasa pembuatan website profesional, cepat, dan SEO-friendly untuk bisnis Anda."
    : "Freelance Web Developer Indonesia specializing in React.js, Next.js & Tailwind CSS. Professional website development — fast, modern, and SEO-friendly.";
  return {
    title: `${METADATA.creator} ${METADATA.exTitle}`,
    description,
    keywords: METADATA.keyword,
    alternates: {
      canonical: `${domain}/${locale}`,
      languages: {
        id: `${domain}/id`,
        en: `${domain}/en`,
        "x-default": `${domain}/id`,
      },
    },
    openGraph: {
      title: `${METADATA.creator} ${METADATA.exTitle}`,
      description,
      url: `${domain}/${locale}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [METADATA.profile],
    },
    twitter: {
      card: "summary_large_image",
      title: `${METADATA.creator} ${METADATA.exTitle}`,
      description,
      images: [METADATA.profile],
    },
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  return (
    <Container data-aos="fade-up">
      <Home />
    </Container>
  );
};

export default HomePage;
