export function Header({ isDark, handleThemeToggle }) {
  return (
    // <header className="vocab" onClick={handleThemeToggle}>
    <header className="vocab">
      <img className="logo" src="./images/iconoir_book.svg" alt="" />
      <div className="toggles">
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
