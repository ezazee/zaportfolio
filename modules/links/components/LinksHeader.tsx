"use client";

import { useState, useTransition } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDarkMode as DarkIcon, MdLightMode as LightIcon } from "react-icons/md";
import { TbGridDots as QRIcon } from "react-icons/tb";
import { IoCopyOutline as CopyIcon, IoCheckmark as CheckIcon } from "react-icons/io5";
import { IoMdClose as CloseIcon } from "react-icons/io";

interface LinksHeaderProps {
  pageUrl: string;
}

const LinksHeader = ({ pageUrl }: LinksHeaderProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLocale = (locale: string) => {
    if (locale === currentLocale || isPending) return;
    startTransition(() => router.replace(pathname, { locale }));
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        {/* Theme toggle */}
        <div className="relative flex items-center rounded-full border border-neutral-300 bg-neutral-100 p-1 dark:border-slate-700 dark:bg-slate-800/80">
          <motion.div
            className="absolute bottom-1 top-1 w-8 rounded-full bg-neutral-300 dark:bg-accent"
            animate={{ x: isLight ? 0 : 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.button
            onClick={() => setTheme("light")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10 flex h-8 w-8 items-center justify-center"
          >
            <LightIcon size={16} className={isLight ? "text-neutral-900" : "text-neutral-400"} />
          </motion.button>
          <motion.button
            onClick={() => setTheme("dark")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10 flex h-8 w-8 items-center justify-center"
          >
            <DarkIcon size={16} className={!isLight ? "text-dark" : "text-neutral-400"} />
          </motion.button>
        </div>

        {/* Language toggle */}
        <div
          className={`relative flex items-center rounded-full border border-neutral-300 bg-neutral-100 p-1 dark:border-slate-700 dark:bg-slate-800/80 ${isPending ? "pointer-events-none opacity-60" : ""}`}
        >
          <motion.div
            className="absolute bottom-1 top-1 w-10 rounded-full bg-accent"
            animate={{ x: currentLocale === "en" ? 0 : 44 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {["en", "id"].map((locale) => (
            <motion.button
              key={locale}
              onClick={() => handleLocale(locale)}
              disabled={isPending}
              whileHover={{ scale: isPending ? 1 : 1.1 }}
              whileTap={{ scale: isPending ? 1 : 0.9 }}
              className="relative z-10 flex h-8 w-10 items-center justify-center"
            >
              <motion.span
                className="text-xs font-semibold"
                animate={{ color: currentLocale === locale ? "#020617" : "#94a3b8" }}
                transition={{ duration: 0.3 }}
              >
                {locale.toUpperCase()}
              </motion.span>
            </motion.button>
          ))}
        </div>

        {/* QR Code button */}
        <motion.button
          onClick={() => setShowQR(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-neutral-700 transition duration-200 hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-800/80 dark:text-neutral-300"
        >
          <QRIcon size={18} />
        </motion.button>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex w-72 flex-col items-center gap-5 rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header modal */}
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Scan QR Code
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <CloseIcon size={16} />
                </button>
              </div>

              {/* QR Code */}
              <div className="rounded-xl border border-neutral-100 p-3 dark:border-neutral-800">
                <QRCodeSVG
                  value={pageUrl}
                  size={180}
                  bgColor="transparent"
                  fgColor={resolvedTheme === "dark" ? "#f5f5f5" : "#171717"}
                />
              </div>

              {/* URL + copy */}
              <div className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
                <p className="flex-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {pageUrl}
                </p>
                <button
                  onClick={handleCopy}
                  className="shrink-0 text-neutral-400 transition hover:text-accent"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckIcon size={15} className="text-green-500" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CopyIcon size={15} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LinksHeader;
