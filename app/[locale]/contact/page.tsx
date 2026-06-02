import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Contact from "@/modules/contact";
import { METADATA } from "@/common/constants/metadata";
import { getBreadcrumbJsonLd } from "@/common/utils/breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const domain = process.env.DOMAIN || "https://zaportfolio.my.id";
  const title = `${t("title")} ${METADATA.exTitle}`;
  const description = t("description");
  return {
    title,
    description,
    keywords: locale === "id"
      ? "hire web developer indonesia, jasa pembuatan website jakarta, kontak freelancer web developer, jasa website murah berkualitas, freelance developer jakarta, hubungi web developer, order website profesional"
      : "hire web developer indonesia, freelance web developer jakarta, contact web developer, affordable website development, professional web developer indonesia",
    openGraph: {
      title,
      description,
      url: `${domain}/${locale}/contact`,
      siteName: "Zaportfolio",
      images: [METADATA.profile],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [METADATA.profile] },
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

const faqId = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa harga jasa pembuatan website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Harga jasa pembuatan website bervariasi tergantung kebutuhan proyek. Hubungi saya melalui form kontak untuk mendapatkan estimasi harga yang sesuai dengan kebutuhan bisnis Anda.",
      },
    },
    {
      "@type": "Question",
      name: "Teknologi apa yang digunakan untuk membuat website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saya menggunakan React.js, Next.js, TypeScript, dan Tailwind CSS untuk frontend, serta Node.js, Laravel, dan PostgreSQL untuk backend. Stack modern yang cepat, scalable, dan SEO-friendly.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama waktu pengerjaan website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waktu pengerjaan tergantung kompleksitas proyek. Landing page sederhana bisa selesai dalam 3-7 hari, website company profile 1-2 minggu, dan aplikasi web kompleks 1-3 bulan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah melayani klien dari seluruh Indonesia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, saya melayani klien dari seluruh Indonesia secara remote. Komunikasi bisa melalui WhatsApp, email, atau video call sesuai kebutuhan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah website yang dibuat mobile-friendly dan SEO-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, semua website yang saya buat sudah responsive (mobile-friendly), cepat (optimasi performa), dan SEO-friendly menggunakan praktik terbaik seperti metadata, sitemap, dan structured data.",
      },
    },
  ],
};

const faqEn = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to build a website?",
      acceptedAnswer: { "@type": "Answer", text: "Pricing varies based on project requirements. Contact me through the form for a custom quote tailored to your business needs." },
    },
    {
      "@type": "Question",
      name: "What technologies do you use to build websites?",
      acceptedAnswer: { "@type": "Answer", text: "I use React.js, Next.js, TypeScript, and Tailwind CSS for frontend, and Node.js, Laravel, and PostgreSQL for backend — a modern stack that is fast, scalable, and SEO-friendly." },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: { "@type": "Answer", text: "Timeline depends on project complexity. A simple landing page takes 3-7 days, a company profile website 1-2 weeks, and a complex web application 1-3 months." },
    },
    {
      "@type": "Question",
      name: "Do you work with clients across Indonesia?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, I work remotely with clients from all over Indonesia. Communication can be via WhatsApp, email, or video call based on your preference." },
    },
    {
      "@type": "Question",
      name: "Are the websites mobile-friendly and SEO-optimized?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, all websites I build are fully responsive (mobile-friendly), performance-optimized, and SEO-ready using best practices including metadata, sitemaps, and structured data." },
    },
  ],
};

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const faqSchema = locale === "en" ? faqEn : faqId;
  const breadcrumb = getBreadcrumbJsonLd(locale, { name: "Contact", path: "/contact" });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container data-aos="fade-up">
        <PageHeading title={t("title")} description={t("description")} />
        <Contact />
      </Container>
    </>
  );
};

export default ContactPage;
