import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { METADATA } from "@/common/constants/metadata";
import { Suspense } from "react";

interface AchievementsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AchievementsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  const domain = process.env.DOMAIN || "";
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "sertifikat web developer, achievements developer indonesia, sertifikasi frontend",
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

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense>
        <Achievements />
      </Suspense>
    </Container>
  );
};

export default AchievementsPage;
