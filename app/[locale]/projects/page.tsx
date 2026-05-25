import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Projects from "@/modules/projects";
import { METADATA } from "@/common/constants/metadata";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  const domain = process.env.DOMAIN || "";
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "portofolio web developer indonesia, project website freelancer, jasa pembuatan web, contoh project react next.js",
    alternates: {
      canonical: `${domain}/${locale}/projects`,
      languages: {
        id: `${domain}/id/projects`,
        en: `${domain}/en/projects`,
        "x-default": `${domain}/id/projects`,
      },
    },
  };
}

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Projects />
    </Container>
  );
};

export default ProjectsPage;
