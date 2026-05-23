import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          SharePad
        </Link>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
