"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
