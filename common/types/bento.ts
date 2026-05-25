import { ReactElement, ReactNode } from "react";

export type BentoItemProps = {
  title: string;
  description: string;
  label?: string;
  icon?: ReactElement;
  visual?: ReactNode;
  href?: string;
  colSpan?: number;
  className?: string;
  isShow?: boolean;
};
