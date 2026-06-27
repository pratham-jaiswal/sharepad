"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar({ initialTheme = "system" }) {
  const pathname = usePathname();
  const moreRef = useRef(null);
  const [moreOpen, setMoreOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const moreItems = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/source-code", label: "Source Code" },
  ];

  const isMoreActive = moreItems.some((item) => pathname === item.href);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          SharePad
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <details className="nav-more" open={moreOpen} ref={moreRef}>
            <summary
              className={isMoreActive ? "active" : ""}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              onClick={(event) => {
                event.preventDefault();
                setMoreOpen((open) => !open);
              }}
            >
              More
            </summary>
            <div className="nav-more-menu" role="menu">
              {moreItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive ? "active" : ""}
                    aria-current={isActive ? "page" : undefined}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </details>
        </nav>
        <ThemeToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}
