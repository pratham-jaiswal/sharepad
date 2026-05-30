"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar({ initialTheme = "system" }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
  ];

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
        </nav>
        <ThemeToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}
