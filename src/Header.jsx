import { useState,  useRef, useEffect } from "react";


export function Header({ isDark, handleThemeToggle }) {
	
	const [menuActive, setMenuActive] = useState(false);

 const [fontFamily, setFontFamily] = useState("InterVariable");
	 
	const shriftToggleRef = useRef(null);


//  useEffect(() => {
   
//     const savedFont = localStorage.getItem("fontFamily");


// if (savedFont) {
//       setFontFamily(savedFont);
//     }
//   }, []);


//  useEffect(() => {
//     document.body.style.fontFamily = fontFamily;
//     localStorage.setItem("fontFamily", fontFamily);
//   }, [fontFamily]);


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
    // <header className="vocab" onClick={handleThemeToggle}>
		<header className="vocab">
			
{/* <div style={{ fontFamily: "Inconsolata", position: "absolute", left: "-9999px" }}>.</div>
      <div style={{ fontFamily: "Lora", position: "absolute", left: "-9999px" }}>.</div> */}

      <img className="logo" src="./images/iconoir_book.svg" alt="" />
			<div className="toggles">
				 <div
          className="shrift-toggle"
          ref={shriftToggleRef}
       
          onClick={(e) => {
            e.stopPropagation();
            setMenuActive(!menuActive);
          }}
        >
          <div className="dropdown">
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
                onClick={() => setFontFamily("InterVariable")}
              >
                Sans Serif
              </div>
              <div
                className="serif"
                onClick={() => setFontFamily("Lora")}
              >
                Serif
              </div>
              <div
                className="mono"
                onClick={() => setFontFamily("Inconsolata")}
              >
                Mono
              </div>
            </div>
          </div>
          <img src="./iamges/icon-arrow-down.svg" alt="" />
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
