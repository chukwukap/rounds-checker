import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="pt-16">{children}</div>;
};
