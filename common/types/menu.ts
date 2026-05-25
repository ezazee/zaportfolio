import { ReactElement, ReactNode } from "react";

export type MenuItemProps = {
  title: string;
  href: string;
  icon: ReactElement;
  onClick?: () => void;
  className?: string;
  isShow?: boolean;
  isExternal: boolean;
  eventName?: string;
  isHover?: boolean;
  children?: ReactNode;
  isExclusive?: boolean;
};
