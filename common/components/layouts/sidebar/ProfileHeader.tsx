import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";

import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import cn from "@/common/libs/clsxm";
import { METADATA } from "@/common/constants/metadata";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-grow items-center gap-4 lg:flex-col  lg:gap-0.5",
        expandMenu && "flex-col !items-start",
      )}
    >
      <div className="relative">
        <div
          className="overflow-hidden rounded-full border-2 border-slate-400 dark:border-slate-800 lg:hover:scale-105 transition-transform duration-300"
          style={{ width: expandMenu ? 80 : imageSize, height: expandMenu ? 80 : imageSize }}
        >
          <Image
            src={"/images/reza.jpg"}
            width={expandMenu ? 80 : imageSize}
            height={expandMenu ? 80 : imageSize}
            alt={METADATA.creator}
            className="h-full w-full object-cover object-[center_10%]"
            priority
            sizes="(max-width: 1024px) 48px, 100px"
          />
        </div>
      </div>

      <div className="mt-1 flex items-center gap-2 lg:mt-4">
        <Link href="/" passHref>
          <h2 className="flex-grow text-lg font-bold leading-tight tracking-tight lg:text-xl">
            Mohamad Reza
          </h2>
        </Link>

        <Tooltip title="Verified">
          <VerifiedIcon size={18} className="text-blue-400" />
        </Tooltip>
      </div>

      <div className="hidden text-sm text-slate-500 transition-all duration-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:flex">
        @mrzsaa
      </div>

      {/* Rekrut Saya Button */}
      <div className="mt-4 hidden w-full lg:block">
        <button className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#fbe400] bg-[#fbe400]/10 py-2.5 text-xs font-bold text-[#020617] transition-all duration-300 hover:bg-[#fbe400] dark:bg-[#fbe400]/5 dark:text-[#fbe400] dark:hover:text-[#020617]">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#fbe400] group-hover:bg-[#020617] dark:group-hover:bg-[#020617]" />
          Rekrut Saya
        </button>
      </div>

      <div className="hidden w-full items-center justify-between gap-4 lg:mt-6 lg:flex">
        <IntlToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileHeader;
