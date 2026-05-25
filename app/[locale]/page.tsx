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

  const domain = process.env.DOMAIN || "";
  return {
    title: `${METADATA.creator} ${METADATA.exTitle}`,
    description: t("resume.paragraph_1"),
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
      description: t("resume.paragraph_1"),
      url: `${domain}/${locale}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
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
