import { useState, useEffect } from "react";

import { Header } from "./Header";

export function App() {
  const [isDark, setIsDark] = useState(window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches);

  // useEffect(() => {
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   setIsDark(prefersDark);
  // }, []);

	useEffect(() => {
		console.log(isDark);
    document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);
	
	const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

	return (<Header handleThemeToggle={ handleThemeToggle} />);
}
