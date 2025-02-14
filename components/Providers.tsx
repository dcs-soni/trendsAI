"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// A client component as SessionProvider can't be directly added to the layout or page as those are server components

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
