"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname();

  // hide header/footer ONLY on not-found page
  const hideLayout =
    pathname === "/not-found" || pathname === "/404" || pathname.includes("page-not-found");

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
