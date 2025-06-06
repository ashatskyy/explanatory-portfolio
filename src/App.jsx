import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState, useEffect, useRef } from "react";

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
  //useNavigate() is a hook from react-router-dom.
  //it returns a function navigate(path, options)
  //path = string path you want to go to
  //options = optional config object like { replace: true }
  // Go to another page
  // navigate('/about');
  // Go to a page and replace current entry in history (like redirect)
  //navigate('/login', { replace: true });
  // Go back one step in history
  //navigate(-1);
  // Go forward one step in history
  //navigate(1);

  const { pageDynamicalAddress } = useParams();
  //This is a hook from react-router-dom.
  //It returns an object containing all the dynamic URL parameters for the current route.

  //здесь мы деструктурируем  useParams(); и берем из него
  //pageDynamicalAddress для дальнейшего использования
  //и он не ведет себя как юзстейт

  const [inputedOrAddressString, setInputedOrAddressString] = useState(
    pageDynamicalAddress || ""
	);
	
	const [reloadKey, setReloadKey] = useState(0);

  // const [exectInputOnEnter, setExectInputonEnter] = useState(pageDynamicalAddress || "");

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

  // fixing cursor lip on enter

  //bad for react solution
  // useEffect(() => {
  // 	if (inputedOrAddressString.trim() !== pageDynamicalAddress) {
  // 		setInputedOrAddressString(pageDynamicalAddress || "");
  // 	}

  // }, [pageDynamicalAddress]);

  //jamping cursor solution

  // 	useEffect(() => {

  // if (exectInputOnEnter.trim() === pageDynamicalAddress) {
  // 			setInputedOrAddressString(exectInputOnEnter || "");

  // 		}else(setInputedOrAddressString(pageDynamicalAddress || ""))
  // 	}, [pageDynamicalAddress, exectInputOnEnter]);

  //два варианиа как они не равны:
  //1.  они не равны и подстриженый excet равен page

  //2. они не равны и подстоиженый exct не равне page
  //тогда ставим его равным pg

  //тот что был
  useEffect(() => {
    setInputedOrAddressString(pageDynamicalAddress || "");
  }, [pageDynamicalAddress]);




  const enterInputString = (e) => {
    e.preventDefault();

    if (!inputedOrAddressString) return;

    // setExectInputonEnter(inputedOrAddressString);

    const cleanedInput = inputedOrAddressString.trim();

    if (!cleanedInput) return;

    if (/^https?:\/\//i.test(cleanedInput)) {
      // alert("Please enter a word or term, not a URL.");
      return;
    }

    if (cleanedInput !== pageDynamicalAddress) {
      navigate(`/${encodeURIComponent(cleanedInput)}`);

      //если в запросе есть знаки типа внутрений пробел
      //или закии припинания то их безпасно переаедут в адрес
      //а потом и назд
    }

    inputRef.current?.blur();
  };




  const handleInputChange = (e) => setInputedOrAddressString(e.target.value);

  const handleRefInput = (e) => {
    setInputedOrAddressString(e);
    navigate(`/${e}`);
  };

  const goHome = () => {
    navigate("/");
    setInputedOrAddressString("");
	};
	

	// const reload = () => {
	// 	 navigate(`/${pageDynamicalAddress}`);
  //   setInputedOrAddressString(pageDynamicalAddress);
	// }

const reload = () => {
  setReloadKey((prev) => prev + 1); // This will force OutputWindow to remount
};





  useEffect(() => {
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
    <div className="scroll-container" ref={containerRef}>
      <Header
        isDark={isDark}
        handleThemeToggle={handleThemeToggle}
        goHome={goHome}
        onUpdate={setSharedFont}
      />

      <main className="main">
        <form
          className="search-container"
          onSubmit={enterInputString}
          autoComplete="off"
          spellCheck="false"
        >
          <input
            value={inputedOrAddressString}
            ref={inputRef}
            onChange={handleInputChange}
            type="search"
            name="search_input_xyz"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength="100"
            placeholder="Search for any word…"
            className={`input-window ${isDark ? "input-window-dark" : ""}`}
            style={{
              fontFamily:
                sharedFont === "Lora"
                  ? "Lora, serif"
                  : sharedFont === "InterVariable"
                  ? "InterVariable, sans-serif"
                  : "Inconsolata, monospace",
            }}
          />
          <button type="submit" className="input-window-button">

            <img
              className="input-window-button-img"
              // className="input-window-icon"
              src="./images/icon-search.svg"
              alt=""
              // onClick={() => inputRef.current?.focus()}
              // onClick={enterInputString}
            />
          </button>
          {/* <img
					
            className="input-window-icon"
            src="./images/icon-search.svg"
            alt=""
            onClick={() => inputRef.current?.focus()}
          
          /> */}
        </form>

        {pageDynamicalAddress && (
          <OutputWindow
						stringForSearch={pageDynamicalAddress}
						sharedFont={sharedFont}
						isDark={isDark}
						scrollToTop={scrollToTop}
						handleRefInput={handleRefInput}
						reload={ reload}
						 
						 key={reloadKey}
          />
        )}
      </main>
    </div>
  );
}
