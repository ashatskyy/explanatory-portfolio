export function Header({handleThemeToggle }) { 
	return (
		 <header className="vocab" onClick={handleThemeToggle} >
     

      <img className="logo" src="./images/iconoir_book.svg" alt="" />
      
    </header>
	)
}