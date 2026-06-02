import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { METADATA } from "@/common/constants/metadata";
import { Suspense } from "react";
import { getBreadcrumbJsonLd } from "@/common/utils/breadcrumb";

interface AchievementsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AchievementsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const title = `${t("title")} ${METADATA.exTitle}`;
  const description = t("description");
  return {
    title,
    description,
    keywords: "sertifikat web developer indonesia, pencapaian freelancer, sertifikasi react next.js, achievements frontend developer, lisensi web developer jakarta",
    openGraph: {
      title,
      description,
      url: `${domain}/${locale}/achievements`,
      siteName: "Zaportfolio",
      images: [METADATA.profile],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [METADATA.profile] },
    alternates: {
      canonical: `${domain}/${locale}/achievements`,
      languages: {
        id: `${domain}/id/achievements`,
        en: `${domain}/en/achievements`,
        "x-default": `${domain}/id/achievements`,
      },
    },
  };
}

const AchievementsPage = async ({ params }: AchievementsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });
  const breadcrumb = getBreadcrumbJsonLd(locale, { name: t("title"), path: "/achievements" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container data-aos="fade-up">
        <PageHeading title={t("title")} description={t("description")} />
        <Suspense>
          <Achievements />
        </Suspense>
      </Container>
    </>
  );
};

export default AchievementsPage;
