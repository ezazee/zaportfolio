import {
  BsGithub as GithubIcon,
  BsInstagram as InstagramIcon,
  BsLinkedin as LinkedinIcon,
  BsWhatsapp as WhatsappIcon,
} from "react-icons/bs";
import { SiGmail } from "react-icons/si";

import { SocialMediaProps } from "../types/socialMedia";

const iconSize = 35;
const backgroundIconSize = 275;

export const SOCIAL_MEDIA: SocialMediaProps[] = [
  {
    title: "Stay in Touch",
    description: "Reach out via email for any inquiries or collaborations.",
    name: "gmail",
    href: `mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`,
    icon: <SiGmail size={iconSize} />,
    backgroundIcon: <SiGmail size={backgroundIconSize} />,
    textColor: "text-red-300",
    backgroundColor: "bg-red-300",
    borderColor: "border-red-300",
    backgroundGradientColor: "bg-gradient-to-b from-red-700 to-red-900",
    colSpan: "md:col-span-2",
    isShow: true,
  },
  {
    title: "Follow My Journey",
    description: "Stay updated with my latest posts and stories on Instagram.",
    name: "instagram",
    href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    icon: <InstagramIcon size={iconSize} />,
    backgroundIcon: <InstagramIcon size={backgroundIconSize} />,
    textColor: "text-purple-200",
    backgroundColor: "bg-purple-200",
    borderColor: "border-purple-200",
    backgroundGradientColor:
      "bg-gradient-to-b from-purple-700 via-pink-500 to-orange-500",
    isShow: true,
  },
  {
    title: "Let's Connect",
    description:
      "Connect for collaboration or explore my professional experience.",
    name: "linkedin",
    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    icon: <LinkedinIcon size={iconSize} />,
    backgroundIcon: <LinkedinIcon size={backgroundIconSize} />,
    textColor: "text-sky-300",
    backgroundColor: "bg-sky-300",
    borderColor: "border-sky-300",
    backgroundGradientColor: "bg-gradient-to-b from-sky-700 to-sky-900",
    isShow: true,
  },
  {
    title: "Explore the Code",
    description: "Explore the source code for all my projects on GitHub.",
    name: "github",
    href: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    icon: <GithubIcon size={iconSize} />,
    backgroundIcon: <GithubIcon size={backgroundIconSize} />,
    textColor: "text-slate-400",
    backgroundColor: "bg-slate-400",
    borderColor: "border-slate-400",
    backgroundGradientColor: "bg-gradient-to-b from-slate-900 to-slate-950",
    isShow: true,
  },
  {
    title: "Chat on WhatsApp",
    description: "Send me a message directly on WhatsApp for a quick response.",
    name: "whatsapp",
    href: `${process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || ""}?text=${encodeURIComponent("Halo Reza! Saya melihat portofolio kamu dan ingin mendiskusikan sesuatu. ")}`,
    icon: <WhatsappIcon size={iconSize} />,
    backgroundIcon: <WhatsappIcon size={backgroundIconSize} />,
    textColor: "text-green-300",
    backgroundColor: "bg-green-300",
    borderColor: "border-green-300",
    backgroundGradientColor: "bg-gradient-to-b from-green-700 to-green-900",
    isShow: true,
  },
];
