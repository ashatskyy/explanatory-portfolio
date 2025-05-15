import { useState, useEffect } from "react";

import { Header } from "./Header";

export function App() {
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  });

  useEffect(() => {
    console.log(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);

    let theme = localStorage.getItem("theme");

    if (!theme) {
      localStorage.setItem("theme", "dark");
    } else {
      const newTheme = theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
    }
  };

	return <Header isDark={ isDark} handleThemeToggle={handleThemeToggle} />;
}
