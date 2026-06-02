import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Projects from "@/modules/projects";
import { METADATA } from "@/common/constants/metadata";
import { getBreadcrumbJsonLd } from "@/common/utils/breadcrumb";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const title = `${t("title")} ${METADATA.exTitle}`;
  const description = t("description");
  return {
    title,
    description,
    keywords: "portofolio web developer indonesia, contoh project website profesional, hasil kerja freelancer web developer, project react next.js indonesia, website buatan freelancer jakarta, referensi jasa pembuatan website",
    openGraph: {
      title,
      description,
      url: `${domain}/${locale}/projects`,
      siteName: "Zaportfolio",
      images: [METADATA.profile],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [METADATA.profile] },
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
  const breadcrumb = getBreadcrumbJsonLd(locale, { name: t("title"), path: "/projects" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container data-aos="fade-up">
        <PageHeading title={t("title")} description={t("description")} />
        <Projects />
      </Container>
    </>
  );
};

export default ProjectsPage;
