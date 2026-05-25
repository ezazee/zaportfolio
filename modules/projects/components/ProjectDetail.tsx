"use client";

import { useTranslations, useLocale } from "next-intl";
import { HiLink as DemoIcon, HiOutlineArrowSmLeft as BackIcon, HiOutlineLightBulb as LessonIcon } from "react-icons/hi";
import { SiGithub as GitHubIcon, SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase, SiPrisma, SiMysql, SiPostgresql, SiNodedotjs, SiPhp, SiFigma, SiReact, SiFramer, SiAppwrite, SiFlutter, SiSqlite, SiRedux, SiDocker, SiSupabase, SiVercel, SiCloudinary, SiStripe, SiAuth0, SiStorybook, SiJest, SiCypress, SiTestinglibrary, SiGraphql, SiSocketdotio, SiRedis, SiMongodb, SiExpress, SiNestjs, SiPython, SiDjango, SiFastapi, SiPandas, SiTensorflow, SiScikitlearn, SiOpenai } from "react-icons/si";
import { FiCopy as CopyIcon, FiCheck as CheckIcon, FiPackage as PackageIcon, FiAlertCircle as ProblemIcon, FiCheckCircle as SolutionIcon } from "react-icons/fi";
import { FaGolang } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectItem } from "@/common/types/projects";
import Image from "@/common/components/elements/Image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mapping icons to React components
const stackIconMap: Record<string, any> = {
  SiNextdotjs: <SiNextdotjs className="text-black dark:text-white" />,
  SiTailwindcss: <SiTailwindcss className="text-cyan-400" />,
  SiTypescript: <SiTypescript className="text-blue-600" />,
  SiFirebase: <SiFirebase className="text-orange-500" />,
  SiPrisma: <SiPrisma className="text-emerald-500" />,
  SiMysql: <SiMysql className="text-blue-500" />,
  SiPostgresql: <SiPostgresql className="text-blue-400" />,
  SiNodedotjs: <SiNodedotjs className="text-green-500" />,
  SiPhp: <SiPhp className="text-indigo-500" />,
  SiFigma: <SiFigma className="text-pink-500" />,
  SiReact: <SiReact className="text-blue-400" />,
  SiFramer: <SiFramer className="text-pink-500" />,
  SiAppwrite: <SiAppwrite className="text-red-500" />,
  SiFlutter: <SiFlutter className="text-sky-400" />,
  SiSqlite: <SiSqlite className="text-blue-600" />,
  SiRedux: <SiRedux className="text-purple-500" />,
  FaGolang: <FaGolang className="text-sky-500" />,
  TbBrandReactNative: <TbBrandReactNative className="text-sky-400" />,
  SiDocker: <SiDocker className="text-blue-500" />,
  SiSupabase: <SiSupabase className="text-emerald-500" />,
  SiVercel: <SiVercel className="text-black dark:text-white" />,
  SiCloudinary: <SiCloudinary className="text-blue-500" />,
  SiStripe: <SiStripe className="text-indigo-600" />,
  SiAuth0: <SiAuth0 className="text-orange-600" />,
  SiStorybook: <SiStorybook className="text-pink-500" />,
  SiJest: <SiJest className="text-red-600" />,
  SiCypress: <SiCypress className="text-emerald-600" />,
  SiTestinglibrary: <SiTestinglibrary className="text-red-500" />,
  SiGraphql: <SiGraphql className="text-pink-600" />,
  SiSocketdotio: <SiSocketdotio className="text-black dark:text-white" />,
  SiRedis: <SiRedis className="text-red-600" />,
  SiMongodb: <SiMongodb className="text-green-600" />,
  SiExpress: <SiExpress className="text-black dark:text-white" />,
  SiNestjs: <SiNestjs className="text-red-600" />,
  SiPython: <SiPython className="text-yellow-500" />,
  SiDjango: <SiDjango className="text-green-900" />,
  SiFastapi: <SiFastapi className="text-teal-500" />,
  SiPandas: <SiPandas className="text-blue-800" />,
  SiTensorflow: <SiTensorflow className="text-orange-500" />,
  SiScikitlearn: <SiScikitlearn className="text-orange-600" />,
  SiOpenai: <SiOpenai className="text-black dark:text-white" />,
};

const ProjectDetail = ({
  title,
  description,
  image,
  stacks,
  link_demo,
  link_github,
  views,
  details,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale();
  const router = useRouter();
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const descriptionDisplay = description[locale as "en" | "id"];
  const aboutDisplay = details?.about[locale as "en" | "id"];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-4xl flex-col space-y-10 pb-20"
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex w-fit items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <BackIcon size={20} />
        <span>{locale === "en" ? "Back" : "Kembali"}</span>
      </button>

      {/* Title Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {descriptionDisplay}
          </p>
        </div>

        <div className="flex flex-col gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
             {views && (
               <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                 <span>👁️</span>
                 <span>{views} {t("views")}</span>
               </div>
             )}
             <div className="flex gap-3 text-2xl text-neutral-400">
               <div className="flex gap-2">
                 <SiNextdotjs size={20} />
                 <SiTypescript size={20} />
                 <SiTailwindcss size={20} />
               </div>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {link_github && (
              <Link
                href={link_github}
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <div className="flex items-center justify-center p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <GitHubIcon size={18} />
                </div>
                <span>{t("source_code_text")}</span>
              </Link>
            )}
            {link_demo && (
              <Link
                href={link_demo}
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <div className="flex items-center justify-center p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <DemoIcon size={18} />
                </div>
                <span>{t("live_demo_text")}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-800">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={675}
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
          className="h-full w-full object-cover"
        />
      </div>

      {/* Detailed Content */}
      <div className="space-y-12 pt-8">
        {/* Introduction */}
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
             <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
             <h2 className="text-xl font-bold">Introduction</h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
            {aboutDisplay}
          </p>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Tech Stack List */}
        {details?.detailed_stacks && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
               <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
               <h2 className="text-xl font-bold">Tech Stack</h2>
            </div>
            <p className="text-neutral-500">This project is powered by:</p>
            <div className="space-y-6">
              {details.detailed_stacks.map((stack) => (
                <div key={stack.name} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1 flex items-center justify-center p-2 rounded-xl bg-neutral-50 border border-neutral-100 dark:bg-neutral-900/50 dark:border-neutral-800">
                    {stackIconMap[stack.icon] || <PackageIcon className="text-xl" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-neutral-800 dark:text-neutral-100">{stack.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {typeof stack.description === "string" ? stack.description : stack.description[locale as "en" | "id"]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Challenges & Solutions */}
        {details?.challenges && (
          <section className="space-y-8">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
               <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
               <h2 className="text-xl font-bold">Challenges & Solutions</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {details.challenges.map((item, idx) => (
                <div key={idx} className="space-y-4 rounded-3xl border border-neutral-100 bg-neutral-50/30 p-6 dark:border-neutral-800 dark:bg-neutral-900/30">
                   <div className="flex gap-3">
                      <div className="mt-1 text-red-500"><ProblemIcon size={20} /></div>
                      <div className="space-y-1">
                         <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-tight">The Challenge</h4>
                         <p className="text-neutral-600 dark:text-neutral-400">{item.problem[locale as "en" | "id"]}</p>
                      </div>
                   </div>
                   <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800 ml-8" />
                   <div className="flex gap-3">
                      <div className="mt-1 text-green-500"><SolutionIcon size={20} /></div>
                      <div className="space-y-1">
                         <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-tight">The Solution</h4>
                         <p className="text-neutral-600 dark:text-neutral-400">{item.solution[locale as "en" | "id"]}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lessons Learned */}
        {details?.lessons_learned && (
          <section className="space-y-6">
             <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
               <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
               <h2 className="text-xl font-bold">Lessons Learned</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {details.lessons_learned.map((lesson, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/30 border border-amber-100/50 dark:bg-amber-900/10 dark:border-amber-900/20">
                   <div className="mt-1 text-accent"><LessonIcon size={20} /></div>
                   <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                     {lesson[locale as "en" | "id"]}
                   </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Features */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
             <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
             <h2 className="text-xl font-bold">Features</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {details?.features.map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/50">
                 <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {feature[locale as "en" | "id"]}
                    </h4>
                 </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Getting Started */}
        {details?.getting_started && (
          <section className="space-y-8">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
               <span className="h-4 w-4 rounded bg-accent shadow-lg shadow-accent/40" />
               <h2 className="text-xl font-bold">{details.getting_started.title[locale as "en" | "id"]}</h2>
            </div>
            <div className="space-y-10">
              {details.getting_started.steps.map((step, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">{index + 1}.</span>
                     <h4 className="font-bold text-neutral-800 dark:text-neutral-200">{step.name[locale as "en" | "id"]}</h4>
                  </div>
                  {step.description && (
                    <p className="text-sm text-neutral-500 pl-6">{step.description[locale as "en" | "id"]}</p>
                  )}
                  <div className="group relative ml-6">
                     <pre className="overflow-x-auto rounded-3xl bg-neutral-100 p-5 text-sm dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                        <code className="text-neutral-700 dark:text-neutral-300 font-mono">{step.code}</code>
                     </pre>
                     <button
                        onClick={() => handleCopy(step.code, index)}
                        className="absolute right-4 top-4 rounded-xl bg-white/50 p-2 opacity-0 transition-opacity backdrop-blur-md group-hover:opacity-100 dark:bg-black/50"
                     >
                        {copiedStep === index ? <CheckIcon size={16} className="text-green-500" /> : <CopyIcon size={16} />}
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
