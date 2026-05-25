"use client";

import React from "react";
import { useTheme } from "next-themes";
import cn from "@/common/libs/clsxm";

interface SkillTagProps {
  name: string;
  icon: JSX.Element;
  color?: string;
  background?: string; // hex color e.g. "#f97316"
}

/**
 * Converts a hex color to rgba with a given alpha.
 * hexToRgba("#f97316", 0.12) => "rgba(249, 115, 22, 0.12)"
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const SkillTag = ({ name, icon, color, background }: SkillTagProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isHex = background?.startsWith("#");

  const bgAlpha = isDark ? 0.18 : 0.1;
  const borderAlpha = isDark ? 0.3 : 0.22;

  const bgColor = isHex ? hexToRgba(background!, bgAlpha) : undefined;
  const borderColor = isHex ? hexToRgba(background!, borderAlpha) : undefined;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md",
        !isHex && "border-slate-200 bg-neutral-100 dark:border-slate-700 dark:bg-slate-800",
      )}
      style={
        isHex
          ? {
              backgroundColor: bgColor,
              borderColor: borderColor,
            }
          : undefined
      }
    >
      <div className={cn("flex h-5 w-5 items-center justify-center", color)}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <span className="text-neutral-800 dark:text-neutral-100">{name}</span>
    </div>
  );
};

export default SkillTag;
