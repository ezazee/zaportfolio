import { motion } from "framer-motion";
import NextImage from "next/image";

import { MENU_ITEMS } from "@/common/constants/menu";
import { METADATA } from "@/common/constants/metadata";

import Breakline from "../../elements/Breakline";
import IntlToggle from "./IntlToggle";
import ThemeToggle from "./ThemeToggle";
import Menu from "./Menu";

const MobileMenu = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);

  return (
    <motion.div
      className="flex h-[100dvh] flex-col"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
    >
      {/* Profile section at top of expanded menu */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="overflow-hidden rounded-full border-2 border-slate-300 dark:border-slate-700 flex-shrink-0"
            style={{ width: 48, height: 48 }}
          >
            <NextImage
              src="/images/reza.jpg"
              alt={METADATA.creator}
              width={48}
              height={48}
              className="h-full w-full object-cover object-[center_10%]"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
              Mohamad Reza
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              @mrzsaa
            </p>
          </div>
        </div>

        {/* Lang + Theme */}
        <div className="flex items-center gap-2">
          <IntlToggle />
          <ThemeToggle />
        </div>
      </div>

      <Breakline />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <Menu list={filteredMenu} />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
