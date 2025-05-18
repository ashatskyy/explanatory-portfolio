import { useState, useRef, useEffect } from "react";

export function Header({ isDark, handleThemeToggle, goHome, onUpdate }) {
// export function Header({ isDark, handleThemeToggle, goHome }) {
  const [menuActive, setMenuActive] = useState(false);
  const [fontFamily, setFontFamily] = useState(() => {
  const stored = localStorage.getItem("fontFamily");
  return stored !== null ? stored : "InterVariable";
});

  const shriftToggleRef = useRef(null);

  

  useEffect(() => {
    // document.body.style.fontFamily = fontFamily;
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        shriftToggleRef.current &&
        !shriftToggleRef.current.contains(e.target)
      ) {
        setMenuActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
		<header className="vocab">
			{/* <div style={{ fontFamily: "InterVariable", position: "absolute", left: "-9999px" }}>.</div>
			<div style={{ fontFamily: "Lora", position: "absolute", left: "-9999px" }}>.</div>
			<div style={{ fontFamily: "Inconsolata", position: "absolute", left: "-9999px" }}>.</div> */}

      <img className="logo" src="./images/iconoir_book.svg" alt="" onClick={goHome}/>
      <div className="toggles">
        <div
          className="shrift-toggle"
          ref={shriftToggleRef}
          onClick={(e) => {
            e.stopPropagation();
            setMenuActive(!menuActive);
          }}
        >
          <div
            className="dropdown"
            style={{
              fontFamily:
                fontFamily === "Lora"
                  ? "Lora, serif"
                  // ? "Lora"
           
                  : fontFamily === "InterVariable"
                  ? "InterVariable, sans-serif"
                  // ? "InterVariable"
                
                  : "Inconsolata, monospace",
                  // : "Inconsolata",
        
            }}
          >
            {fontFamily === "InterVariable"
              ? "Sans Serif"
              : fontFamily === "Lora"
              ? "Serif"
              : fontFamily === "Inconsolata"
              ? "Mono"
              : "Sans Serif"}

            <div
              className={`dropdown-menu ${menuActive ? "active" : ""} ${
                isDark ? "dropdown-menu-dark" : ""
              }`}
            >
              <div
                className="sans-serif"
								onClick={() => {
									setFontFamily("InterVariable");
									onUpdate("InterVariable");
								}
								}
              >
                Sans Serif
              </div>
							<div className="serif" onClick={() => {
								setFontFamily("Lora");
								onUpdate("Lora");
							}
							}>
                Serif
              </div>
              <div
								className="mono"
								onClick={() => {
									setFontFamily("Inconsolata");
									onUpdate("Inconsolata");
								}}
              >
                Mono
              </div>
            </div>
          </div>
         <img className="icon-arrow" src="./images/icon-arrow-down.svg" alt="" />
        </div>

        <div className="vl"></div>

        <div className="light-toggle">
          <div
            className={`board ${isDark ? "board-dark" : ""}`}
            onClick={handleThemeToggle}
          >
            <div className={`point ${isDark ? "move-right" : ""}`}></div>
          </div>
          {isDark ? (
            <img className="night" src="./images/icon-moon-nigth.svg" alt="" />
          ) : (
            <img className="night" src="./images/icon-moon-day.svg" alt="" />
          )}
        </div>
      </div>
    </header>
  );
}
