import { useState, useEffect } from "react";

import { Header } from "./Header";

export function App() {
  const [isDark, setIsDark] = useState(window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches);

  // useEffect(() => {
  // localStorage.setItem("theme", isDark ? "dark" : "light");
  // }, []);

	useEffect(() => {
		console.log(isDark);
    document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);
	
	const handleThemeToggle = () => {
		setIsDark((prev) => !prev);




let theme = localStorage.getItem("theme");

if (!theme) {
 
  localStorage.setItem("theme", "light");
} else {
 
  const newTheme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  }


  };

	return (<Header handleThemeToggle={ handleThemeToggle} />);
	// return (<Header  />);
}
