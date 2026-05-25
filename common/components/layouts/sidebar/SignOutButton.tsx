"use client";

import { useSession, signOut } from "next-auth/react";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import Breakline from "../../elements/Breakline";

const SignOutButton = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      <Breakline className="my-2" />
      <button
        onClick={() => signOut()}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-600 transition duration-200 hover:bg-red-50 hover:text-red-500 dark:text-neutral-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        <LogoutIcon size={18} />
        <span>Sign Out</span>
      </button>
    </>
  );
};

export default SignOutButton;
