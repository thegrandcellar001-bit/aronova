"use client";

import React from "react";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <>{children}</>;
};

export default Providers;
