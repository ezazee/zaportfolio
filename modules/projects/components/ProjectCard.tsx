"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useLocale } from "next-intl";
import { ProjectItem } from "@/common/types/projects";
import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, 
  SiFirebase, SiFigma, SiCoreldraw, SiPrisma, SiMysql,
  SiPostgresql, SiNodedotjs, SiPhp
} from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import { FaGolang } from "react-icons/fa6";
import { TbBrandFramerMotion, TbBrandReactNative } from "react-icons/tb";

const stackIcons: Record<string, any> = {
  "React": <SiReact className="text-blue-400" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "TypeScript": <SiTypescript className="text-blue-600" />,
  "Framer Motion": <TbBrandFramerMotion className="text-pink-500" />,
  "Firebase": <SiFirebase className="text-orange-500" />,
  "Adobe Photoshop": <DiPhotoshop className="text-blue-800" />,
  "Adobe Illustrator": <SiCoreldraw className="text-orange-800" />,
  "Figma": <SiFigma className="text-pink-500" />,
  "Go": <FaGolang className="text-sky-500" />,
  "PHP": <SiPhp className="text-indigo-500" />,
  "MySQL": <SiMysql className="text-blue-500" />,
  "PostgreSQL": <SiPostgresql className="text-blue-400" />,
  "Prisma": <SiPrisma className="text-emerald-500" />,
  "Node.js": <SiNodedotjs className="text-green-500" />,
  "React Native": <TbBrandReactNative className="text-sky-400" />,
};

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  reactions,
}: ProjectItem) => {
  const locale = useLocale();
  const descriptionDisplay = description[locale as "en" | "id"];

  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group h-full"
      >
        <SpotlightCard className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white/50 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
            <Image
              src={image}
              alt={title}
              width={600}
              height={340}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">View Detail</span>
                <ViewIcon size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col space-y-3 p-5">
            <div className="space-y-1">
              <h3 className="line-clamp-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {descriptionDisplay}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {stacks.slice(0, 5).map((stack) => (
                <div key={stack} title={stack} className="text-xl opacity-80 hover:opacity-100">
                  {stackIcons[stack] || stack}
                </div>
              ))}
            </div>

            {/* Removed reactions footer as requested */}
          </div>
        </SpotlightCard>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
