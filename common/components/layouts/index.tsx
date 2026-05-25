"use client";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import ChatButton from "../../../modules/chat/components/ChatButton";

import Sidebar from "./sidebar";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  const pathname = usePathname();

  const isLinksPage = pathname.endsWith("/links");
  const isShowChatButton = !pathname.endsWith("/chat") && !isLinksPage;

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 0,
      once: true,
      offset: 20,
    });
  }, []);

  if (isLinksPage) {
    return (
      <main className="min-h-screen bg-neutral-50 dark:bg-dark">
        {children}
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-7xl lg:px-12">
      <div className="mx-auto flex flex-col lg:flex-row lg:gap-10 lg:py-8">
        {/* Left Column: Integrated Sidebar */}
        <Sidebar />

        {/* Right Column: Main Content */}
        <main className="flex-1 pt-14 pb-10 transition-all duration-300 lg:pb-0 lg:pt-0">
          {children}
        </main>
      </div>
      <Notif />
      {isShowChatButton && <ChatButton />}
    </div>
  );
};

export default Layouts;
