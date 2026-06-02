import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Links from "@/modules/links";
import { METADATA } from "@/common/constants/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LinksPage" });
  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const title = `${t("title")} ${METADATA.exTitle}`;
  const description = t("description");
  return {
    title,
    description,
    keywords: "social media mohamad reza reziyanto, links web developer indonesia, kontak developer jakarta, github linkedin instagram reza",
    openGraph: {
      title,
      description,
      url: `${domain}/${locale}/links`,
      siteName: "Zaportfolio",
      images: [METADATA.profile],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [METADATA.profile] },
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
