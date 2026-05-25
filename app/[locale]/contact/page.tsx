import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Contact from "@/modules/contact";
import { METADATA } from "@/common/constants/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const domain = process.env.DOMAIN || "";
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "hire freelancer indonesia, kontak web developer, jasa freelance website murah, contact developer jakarta",
    alternates: {
      canonical: `${domain}/${locale}/contact`,
      languages: {
        id: `${domain}/id/contact`,
        en: `${domain}/en/contact`,
        "x-default": `${domain}/id/contact`,
      },
    },
  };
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Contact />
    </Container>
  );
};

export default ContactPage;
