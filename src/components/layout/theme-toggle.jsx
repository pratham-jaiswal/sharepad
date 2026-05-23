"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "system");
  }, []);

  function apply(next) {
    if (next === "system") {
      localStorage.removeItem("theme");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = systemDark ? "dark" : "light";
    } else {
      localStorage.setItem("theme", next);
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
