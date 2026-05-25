"use client";

import { useSession } from "next-auth/react";

export const useIsAuthor = () => {
  const { data: session } = useSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_AUTHOR_EMAIL;
};
