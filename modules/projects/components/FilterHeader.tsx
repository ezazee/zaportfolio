"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cn from "@/common/libs/clsxm";

const FilterHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentType = searchParams.get("type") || "Semua";

  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      {["Semua", "Web", "Mobile", "Design"].map((type) => (
        <button
          key={type}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            if (type === "Semua") {
              params.delete("type");
            } else {
              params.set("type", type);
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
            currentType === type
              ? "bg-accent text-dark shadow-lg shadow-accent/20"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default FilterHeader;
