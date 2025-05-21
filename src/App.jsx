import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";


import { useState, useEffect,useRef } from "react";

import { Header } from "./Header";
import { OutputWindow } from "./OutputWindow";


export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:pageDynamicalAddress" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}






export function HomePage() {

const navigate = useNavigate();
	const { pageDynamicalAddress } = useParams();
	
	const [inputedOrAddressString, setInputedOrAddressString] = useState(
		pageDynamicalAddress || "");

	// const [sharedFont, setSharedFont] = useState("InterVariable");
	const [sharedFont, setSharedFont] = useState(() => {
  const stored = localStorage.getItem("fontFamily");
  return stored !== null ? stored : "InterVariable";
	});
	
	  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  });

	const inputRef = useRef(null);


  useEffect(() => {
   
		setInputedOrAddressString(pageDynamicalAddress || "");

  }, [pageDynamicalAddress]);

	




  const enterInputString = (e) => {
    e.preventDefault();
    const cleanedInput = inputedOrAddressString.trim();
    if (cleanedInput && cleanedInput !== pageDynamicalAddress) {
      navigate(`/${cleanedInput}`);
    }
  };

  const handleInputChange = (e) => setInputedOrAddressString(e.target.value);

	const handleRefInput = (e) => {
	
		setInputedOrAddressString(e); 
		 navigate(`/${e}`);

	}


  const goHome = () => {
    navigate("/");
    setInputedOrAddressString(""); 
  };
	
	
	
	




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

	const containerRef = useRef(null);

	const scrollToTop = () => {
		// containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
		containerRef.current?.scrollTo({ top: 0 });
	};

	return (
		<div className="scroll-container" ref={containerRef} >

			<Header
				isDark={isDark}
				handleThemeToggle={handleThemeToggle}
				goHome={goHome}
				onUpdate={setSharedFont}
			
			/>
      
				<main className="main">
				<form className="search-container" onSubmit={enterInputString}
				
				
			
				
				
				>
        <input
						type="text"
						autocapitalize="off"
					 ref={inputRef}
						value={inputedOrAddressString}
						onChange={handleInputChange}
						
						 maxLength="100" 
						placeholder="Search for any word…"
						className={`input-window ${isDark ? "input-window-dark" : ""}`}
						


	style={{
              fontFamily:
                sharedFont === "Lora"
                  ? "Lora, serif"
                  // ? "Lora"
           
                  : sharedFont === "InterVariable"
                  ? "InterVariable, sans-serif"
                  // ? "InterVariable"
                
                  : "Inconsolata, monospace",
                  // : "Inconsolata",
        
            }}







					/>
					 <img
          className="input-window-icon"
          src="./images/icon-search.svg"
          alt=""
          onClick={() => inputRef.current?.focus()}
        />
				</form>
				



      {pageDynamicalAddress && (
					<OutputWindow
						stringForSearch={pageDynamicalAddress}
						sharedFont={sharedFont}
						isDark={isDark}
						scrollToTop={scrollToTop}
						handleRefInput={  handleRefInput }/>
      )}
   </main>
    </div>

	)
	
	
	
	
}

