"use client";

import { useState } from "react";
import { LuPencil as EditIcon, LuTrash2 as DeleteIcon } from "react-icons/lu";
import { useIsAuthor } from "@/hooks/useIsAuthor";

interface AuthorActionsProps {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const AuthorActions = ({ children, onEdit, onDelete, className = "" }: AuthorActionsProps) => {
  const isAuthor = useIsAuthor();
  const [isHover, setIsHover] = useState(false);

  if (!isAuthor) return <>{children}</>;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      {isHover && (
        <div className="absolute right-2 top-2 z-20 flex gap-1">
          {onEdit && (
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-accent hover:text-dark dark:bg-neutral-800/90 dark:text-neutral-300"
            >
              <EditIcon size={13} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-red-500 hover:text-white dark:bg-neutral-800/90 dark:text-neutral-300"
            >
              <DeleteIcon size={13} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorActions;
