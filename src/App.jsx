import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { pageDynamicalAddress } = useParams();

  const [inputedOrAddressString, setInputedOrAddressString] = useState(
    pageDynamicalAddress || ""
  );

  const [reloadKey, setReloadKey] = useState(0);

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

    if (!inputedOrAddressString) return;

    const cleanedInput = inputedOrAddressString.trim().toLocaleLowerCase();

    if (!cleanedInput) return;

    if (/^https?:\/\//i.test(cleanedInput) || /[^a-zA-Z ]/.test(cleanedInput)) {
      return;
    }

    if (cleanedInput !== pageDynamicalAddress) {
      navigate(`/${encodeURIComponent(cleanedInput)}`);
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

  const reload = () => {
    setReloadKey((prev) => prev + 1);
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
    containerRef.current?.scrollTo({ top: 0 });
  };

  return (
    <>
      <Helmet>
        <title>
          English Explanatory Dictionary Online. Portfolio by Oleksandr S
        </title>
        <meta
          name="description"
          content={`English Explanatory Dictionary Online. Discover clear definitions, example sentences, and word usage to improve your English vocabulary and understanding.`}
        />
        <meta
          property="og:title"
          content={`English Explanatory Dictionary Online. Portfolio by Oleksandr S`}
        />
        <meta
          property="og:description"
          content={`English Explanatory Dictionary Online. Discover clear definitions, example sentences, and word usage to improve your English vocabulary and understanding.`}
        />
      </Helmet>

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
							
							className={`input-window ${isDark ? "input-window-dark" : ""}`}
						
							 style={{
                fontFamily:
                  sharedFont === "Lora"
                    ? "Lora, serif"
                    : sharedFont === "InterVariable"
                    ? "InterVariable, sans-serif"
                    : "Inconsolata, monospace",
              }}

              readOnly={isLoading}
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
						/>
						
            <button type="submit" className="input-window-button">
              <img
                className="input-window-button-img"
                src="./images/icon-search.svg"
                alt="Search"
              />
						</button>
						
          </form>

          {pageDynamicalAddress ? (
            <OutputWindow
              stringForSearch={pageDynamicalAddress}
              sharedFont={sharedFont}
              isDark={isDark}
              scrollToTop={scrollToTop}
              handleRefInput={handleRefInput}
              reload={reload}
              key={reloadKey}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <h1 className="visually-hidden">
              English Explanatory Dictionary Online.
            </h1>
          )}
        </main>
      </div>
    </>
  );
}
