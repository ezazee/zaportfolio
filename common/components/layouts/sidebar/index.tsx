import React from "react";

import { MENU_ITEMS } from "@/common/constants/menu";

import Copyright from "../../elements/Copyright";
import Breakline from "../../elements/Breakline";
import Profile from "./Profile";
import Menu from "./Menu";
import SignOutButton from "./SignOutButton";

export default function Sidebar() {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  return (
    <header className="lg:w-1/4">
      <div className="sticky top-8 z-10 flex flex-col transition-all duration-300 lg:rounded-3xl lg:border lg:border-slate-200 lg:bg-white/60 lg:p-6 lg:backdrop-blur-md dark:lg:border-slate-800 dark:lg:bg-slate-900/50">
        <Profile />
        <div className="hidden md:block">
          <div className="mt-4 hidden lg:block">
            <Menu list={filteredMenu} />
            <SignOutButton />
          </div>
          <Breakline className="my-4" />
          <div className="flex flex-col gap-4">
            <Copyright />
          </div>
        </div>
      </div>
    </header>
  );
}
