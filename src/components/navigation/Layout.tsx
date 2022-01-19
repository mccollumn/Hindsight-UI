import React from "react";

export const Layout = ({ label }: LayoutProps) => {
  return <div>{label}</div>;
};

interface LayoutProps {
  /* Title of application */
  label?: string;
}
