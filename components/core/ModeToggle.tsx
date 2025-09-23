"use client";

import * as React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  // Get the current theme and the function to set it
  const { theme, setTheme } = useTheme();

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme} // Call the toggle function on click
      className="relative h-9 w-9 overflow-hidden" // Keep styling, added overflow-hidden for neatness
    >
      {/* Sun Icon: Visible in light mode, hidden/rotated in dark mode */}
      <FiSun className="absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />

      {/* Moon Icon: Hidden/rotated in light mode, visible in dark mode */}
      <FiMoon className="absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

      {/* Screen Reader Only text for accessibility */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
