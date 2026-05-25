"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { IoClose as CloseIcon } from "react-icons/io5";
import { AchievementItem } from "@/common/types/achievements";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Portal from "@/common/components/elements/Portal";
import Link from "next/link";

const AchievementCard = ({
  name,
  issuing_organization,
  issue_date,
  image,
  type,
  category,
  credential_id,
  url_credential,
}: AchievementItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("AchievementsPage");

  const currentLocale = locale as "en" | "id";
  const nameDisplay = name.en;
  const orgDisplay = issuing_organization[currentLocale];
  const typeDisplay = type[currentLocale];
  const catDisplay = category[currentLocale];

  const issueDate = issue_date ? format(parseISO(issue_date), "MMMM yyyy") : "";
  const issuedOnText = currentLocale === "en" ? "Issued on" : "Diterbitkan";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        layoutId={`card-${image}`}
        onClick={() => setIsOpen(true)}
        className="h-full cursor-pointer"
      >
        <SpotlightCard className="group flex h-full flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <div className="relative overflow-hidden">
            <motion.div layoutId={`image-${image}`}>
              <Image
                src={image}
                alt={nameDisplay}
                width={500}
                height={250}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="min-h-[180px] w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105 md:h-[180px]"
              />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium">View detail</span>
              <ViewIcon size={20} />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
            <div className="space-y-2">
              {credential_id && (
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                  {credential_id}
                </p>
              )}
              <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-200">
                {nameDisplay}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {orgDisplay}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[10px] capitalize text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                  {typeDisplay}
                </span>
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[10px] capitalize text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                  {catDisplay}
                </span>
              </div>

              <div className="border-t border-neutral-100 pt-2 dark:border-neutral-800">
                <p className="text-[10px] uppercase text-neutral-400 dark:text-neutral-500">
                  {issuedOnText} {issueDate}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                layoutId={`card-${image}`}
                className="relative z-[10000] flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-900 md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 z-[10001] rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                >
                  <CloseIcon size={20} />
                </button>

                {/* Image */}
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800">
                  <motion.div layoutId={`image-${image}`}>
                    <Image
                      src={image}
                      alt={nameDisplay}
                      width={1000}
                      height={700}
                      className="max-h-[50vh] w-full object-contain md:max-h-[85vh]"
                    />
                  </motion.div>
                </div>

                {/* Info panel — visible on all sizes */}
                <div className="flex w-full flex-col border-t border-neutral-200 p-4 dark:border-neutral-800 sm:p-6 md:w-72 md:shrink-0 md:border-l md:border-t-0 lg:w-80">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white sm:text-lg">
                    {nameDisplay}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {orgDisplay}
                  </p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs uppercase text-neutral-400">Credential ID</p>
                      <p className="text-sm dark:text-neutral-300">{credential_id || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-neutral-400">Type</p>
                      <p className="text-sm capitalize dark:text-neutral-300">{typeDisplay || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-neutral-400">Category</p>
                      <p className="text-sm capitalize dark:text-neutral-300">{catDisplay || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-neutral-400">{issuedOnText} Date</p>
                      <p className="text-sm dark:text-neutral-300">{issueDate}</p>
                    </div>
                  </div>

                  {url_credential && (
                    <Link
                      href={url_credential}
                      target="_blank"
                      className="mt-4 flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-dark transition duration-300 hover:scale-105 hover:bg-amber-400"
                    >
                      <p className="text-sm font-semibold">Credential URL</p>
                      <ViewIcon size={18} />
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default AchievementCard;
