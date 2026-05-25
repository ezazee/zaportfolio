"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BiHomeAlt2 as HomeIcon, BiErrorAlt } from "react-icons/bi";

import Container from "@/common/components/elements/Container";

const NotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <Container className="flex h-[80vh] flex-col items-center justify-center gap-y-7">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <BiErrorAlt size={70} className="mb-4 text-rose-500 drop-shadow-lg" />
        </motion.div>

        <h1 className="text-8xl font-black tracking-widest text-neutral-800 drop-shadow-sm dark:text-neutral-100 md:text-9xl">
          4<span className="text-primary dark:text-[#FACC15]">0</span>4
        </h1>

        <div className="absolute bottom-[20%] rotate-3 rounded bg-rose-500 px-4 py-1 text-sm font-bold tracking-wide text-white shadow-xl md:text-base">
          {t("title")}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex max-w-sm flex-col items-center space-y-1 text-center text-sm md:text-base"
      >
        <span className="font-medium text-neutral-500">
          The page you are looking for has been moved or doesn't exist.
        </span>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border-2 border-primary bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-primary dark:border-[#FACC15] dark:bg-[#FACC15] dark:text-neutral-950 dark:hover:bg-transparent dark:hover:text-[#FACC15]"
        >
          <motion.div
            animate={{ x: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <HomeIcon size={18} />
          </motion.div>
          <span>{t("button")}</span>
        </Link>
      </motion.div>
    </Container>
  );
};

export default NotFound;
