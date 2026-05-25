import clsx from "clsx";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { useMenu } from "@/common/stores/menu";

import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, toggleMenu } = useMenu();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <>
      {/* ── Mobile fixed bar (hidden on lg+) ── */}
      <div
        className={clsx(
          "fixed inset-x-0 top-0 z-20 flex flex-col bg-white dark:bg-[#020617] dark:border-b dark:border-slate-800 shadow-sm lg:hidden",
        )}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link href="/">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Mohamad Reza
            </span>
          </Link>
          <MobileMenuButton expandMenu={isOpen} setExpandMenu={toggleMenu} />
        </div>
        <AnimatePresence>{isOpen && <MobileMenu />}</AnimatePresence>
      </div>

      {/* ── Desktop sidebar profile (hidden below lg) ── */}
      <div className="hidden lg:block">
        <ProfileHeader expandMenu={false} imageSize={100} />
      </div>
    </>
  );
};

export default Profile;
