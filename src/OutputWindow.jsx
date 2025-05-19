import { useState, useEffect } from "react";

import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";
import { ResultPositive } from "./ResultPositive";
import { ResultNegative } from "./ResultNegative";

export function OutputWindow({ stringForSearch, sharedFont, isDark, scrollToTop, handleRefInput  }) {
	const [fetchedData, setFetchedData] = useState(null);
	const [request, setRequest] = useState(stringForSearch);


	const handleWordByRef = (wordRef) => {
	
		scrollToTop();
		handleRefInput(wordRef);
		setRequest(wordRef)
	}

	useEffect(() => {
		setRequest(stringForSearch);
	 },[stringForSearch])


	useEffect(() => {


		if (!request.trim()) return;

		fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${request}`)
			.then((res) => res.json())
			.then((data) => {
				if (!Array.isArray(data)) {
					setFetchedData(data);
				} else {
					const word = new SetObjectWord();
					setFetchedData(populateWordFromData(data, word));
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, [request]);

	useEffect(() => {
		console.log("Fetched data updated:", fetchedData);
	}, [fetchedData]);

	return (
		<div className="output" style={{
              fontFamily:
                sharedFont === "Lora"
                  ? "Lora, serif"
                  // ? "Lora"
           
                  : sharedFont === "InterVariable"
                  ? "InterVariable, sans-serif"
                  // ? "InterVariable"
                
                  : "Inconsolata, monospace",
                  // : "Inconsolata",
        
            }}>

			{fetchedData?.word && 
			<ResultPositive
				fetchedData={fetchedData}
				sharedFont={sharedFont}
				isDark={isDark}
					handleWordByRef={ handleWordByRef}
			/>
				|| fetchedData?.title && <ResultNegative isDark={isDark} request={ request}/>}
			
			{/* {fetchedData.word && 
			<ResultPositive
				fetchedData={fetchedData} />
				|| fetchedData.title} */}
			{/* ЗДЕСЬ ОБЯЗАТЕЛЬНО НУЖНО ВЫЯСНИТЬ ПОЧЕМУ ТАК ПРИВОДИТ К ОШИБКЕ ПРИ ПЕРЕЗАГРУЗКЕ */}
			
    </div>
  );
}
