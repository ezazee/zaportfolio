import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import About from "@/modules/about";
import { METADATA } from "@/common/constants/metadata";
import { getBreadcrumbJsonLd } from "@/common/utils/breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const title = `${t("title")} ${METADATA.exTitle}`;
  const description = t("description");
  return {
    title,
    description,
    keywords: locale === "id"
      ? "tentang mohamad reza reziyanto, profil web developer jakarta, freelancer web developer indonesia, background web developer react nextjs"
      : "about mohamad reza reziyanto, jakarta web developer profile, freelance web developer indonesia, react nextjs developer background",
    openGraph: {
      title,
      description,
      url: `${domain}/${locale}/about`,
      siteName: "Zaportfolio",
      images: [METADATA.profile],
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description, images: [METADATA.profile] },
    alternates: {
      canonical: `${domain}/${locale}/about`,
      languages: {
        id: `${domain}/id/about`,
        en: `${domain}/en/about`,
        "x-default": `${domain}/id/about`,
      },
    },
  };
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const breadcrumb = getBreadcrumbJsonLd(locale, { name: t("title"), path: "/about" });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container data-aos="fade-up">
        <PageHeading title={t("title")} description={t("description")} />
        <About />
      </Container>
    </>
  );
};

export default AboutPage;
