import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Links from "@/modules/links";
import { METADATA } from "@/common/constants/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LinksPage" });
  const domain = process.env.DOMAIN || "";
  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    alternates: {
      canonical: `${domain}/${locale}/links`,
      languages: {
        id: `${domain}/id/links`,
        en: `${domain}/en/links`,
        "x-default": `${domain}/id/links`,
      },
    },
  };
}

const LinksPage = async ({ params }: Props) => {
  const { locale } = await params;
  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  return <Links domain={domain} locale={locale} />;
};

export default LinksPage;
