"use client";

import { LuPlus as PlusIcon } from "react-icons/lu";
import { useIsAuthor } from "@/hooks/useIsAuthor";

interface FloatingAddButtonProps {
  label: string;
  onClick: () => void;
}

const FloatingAddButton = ({ label, onClick }: FloatingAddButtonProps) => {
  const isAuthor = useIsAuthor();
  if (!isAuthor) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-dark shadow-lg transition hover:bg-amber-400 active:scale-95"
    >
      <PlusIcon size={18} />
      {label}
    </button>
  );
};

export default FloatingAddButton;
