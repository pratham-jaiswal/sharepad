"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  function persistTheme(next) {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `sharepad_theme=${next}; path=/; max-age=${maxAge}; samesite=lax`;
  }

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
      return;
    }
    setTheme("system");
  }, []);

  function apply(next) {
    if (next === "system") {
      localStorage.setItem("theme", "system");
      persistTheme("system");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.dataset.theme = systemDark ? "dark" : "light";
    } else {
      localStorage.setItem("theme", next);
      persistTheme(next);
      document.documentElement.dataset.theme = next;
    }
    setTheme(next);
  }

  return (
    <div className="theme-toggle" role="tablist" aria-label="Theme selector">
      <button
        type="button"
        className={`theme-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => apply("light")}
      >
        Light
      </button>
      <button
        type="button"
        className={`theme-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => apply("dark")}
      >
        Dark
      </button>
      <button
        type="button"
        className={`theme-btn ${theme === "system" ? "active" : ""}`}
        onClick={() => apply("system")}
      >
        Auto
      </button>
    </div>
  );
}
