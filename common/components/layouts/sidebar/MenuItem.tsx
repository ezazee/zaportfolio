"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRightShort as ExternalLinkIcon } from "react-icons/bs";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";

import { MenuItemProps } from "@/common/types/menu";
import { useMenu } from "@/common/stores/menu";
import SpotlightCard from "../../elements/SpotlightCard";

const MenuItem = ({
  title,
  href,
  icon,
  onClick,
  className = "",
  isHover,
  children,
  isExclusive,
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { hideMenu } = useMenu();
  const isExternalUrl = href?.includes("http");
  const isHashLink = href === "#";

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActiveRoute = pathname === href;
  const t = useTranslations("Navigation");

  const activeClasses = `${
    isExclusive
      ? "my-1 flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-4 py-2 text-accent hover:bg-accent/20 dark:border-accent dark:bg-accent/10 dark:text-accent dark:hover:bg-accent/20 lg:transition-all lg:duration-300 lg:hover:scale-105"
      : `
        flex items-center gap-2 py-2 px-4 
        text-slate-600 dark:text-slate-400 
        hover:text-slate-900 hover:dark:text-slate-200 
        rounded-lg group 
      ${
        isActiveRoute
          ? "bg-neutral-100 text-slate-900 dark:bg-slate-800/80 dark:!text-[#fbe400]"
          : "hover:lg:bg-neutral-100 hover:dark:lg:bg-slate-800/40 hover:dark:!text-slate-200 lg:transition-all lg:duration-300 lg:hover:scale-105"
      }`
  }`;

  const handleClick = () => {
    hideMenu();
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const elementProps = {
    className: `${activeClasses} ${className}`,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        {!isExclusive ? (
          <>
            <div
              className={clsx(
                "transition-all duration-300 group-hover:-rotate-12",
                isActiveRoute && "animate-pulse",
              )}
            >
              {icon}
            </div>
            <div className="flex-grow">{t(title)}</div>
            {children && <>{children}</>}
            {isActiveRoute && (
              <ExternalLinkIcon
                size={22}
                className="animate-pulse text-neutral-500 dark:text-neutral-400"
              />
            )}
            {isExternalUrl && isHovered && (
              <ExternalLinkIcon
                size={22}
                className="-rotate-45 text-neutral-500 dark:text-neutral-400 lg:transition-all lg:duration-300"
              />
            )}
          </>
        ) : (
          <>
            <div
              className={clsx(
                "transition-all duration-300 group-hover:-rotate-12",
                isActiveRoute && "animate-pulse",
              )}
            >
              {icon}
            </div>
            <div className="flex-grow">{t(title)}</div>
          </>
        )}
      </div>
    );
  };

  return isHashLink ? (
    <div className="cursor-pointer">{itemComponent()}</div>
  ) : (
    <Link
      aria-current={isActiveRoute ? "page" : undefined}
      href={href}
      target={isExternalUrl ? "_blank" : ""}
      onClick={handleClick}
    >
      {itemComponent()}
    </Link>
  );
};

export default MenuItem;
