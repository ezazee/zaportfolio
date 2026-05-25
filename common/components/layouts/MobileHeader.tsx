import Link from "next/link";
import { useMenu } from "@/common/stores/menu";
import MobileMenuButton from "./sidebar/MobileMenuButton";
import MobileMenu from "./sidebar/MobileMenu";
import useIsMobile from "@/hooks/useIsMobile";
import { AnimatePresence } from "framer-motion";

const MobileHeader = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggleMenu } = useMenu();

  return (
    <div className="flex flex-col lg:hidden">
      {/* Top bar: name + hamburger */}
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" passHref>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Mohamad Reza
          </span>
        </Link>

        {isMobile && (
          <MobileMenuButton expandMenu={isOpen} setExpandMenu={toggleMenu} />
        )}
      </div>

      {/* Expanded mobile menu */}
      {isMobile && (
        <AnimatePresence>{isOpen && <MobileMenu />}</AnimatePresence>
      )}
    </div>
  );
};

export default MobileHeader;
