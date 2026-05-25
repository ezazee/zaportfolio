import { ReactElement, ReactNode } from "react";

export type ServiceProps = {
  color: string;
  title: string;
  description: string;
  label: string;
  children: ReactNode;
  icon?: ReactElement;
  className?: string;
  isShow?: boolean;
};
