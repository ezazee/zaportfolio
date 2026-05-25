import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProjectsDataBySlug } from "@/services/projects";
import Container from "@/common/components/elements/Container";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";
import { METADATA } from "@/common/constants/metadata";
import { notFound } from "next/navigation";

interface ProjectDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectsDataBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} | ${METADATA.exTitle}`,
    description: project.description[locale as "en" | "id"],
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}/projects/${slug}`,
    },
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;
  const project = await getProjectsDataBySlug(slug);

  if (!project) notFound();

  return (
    <Container data-aos="fade-up">
      <ProjectDetail {...project} />
    </Container>
  );
};

export default ProjectDetailPage;
