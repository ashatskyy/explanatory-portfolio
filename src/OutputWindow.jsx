import { useState, useEffect } from "react";

import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";
import { ResultPositive } from "./ResultPositive";

export function OutputWindow({ stringForSearch }) {
	const [fetchedData, setFetchedData] = useState(null);

	useEffect(() => {
		if (!stringForSearch.trim()) return;

		fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${stringForSearch}`)
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
	}, [stringForSearch]);

	useEffect(() => {
		console.log("Fetched data updated:", fetchedData);
	}, [fetchedData]);

	return (
		<div className="output">

			{fetchedData?.word && 
			<ResultPositive
				fetchedData={fetchedData} />
				|| fetchedData?.title}
			
			{/* {fetchedData.word && 
			<ResultPositive
				fetchedData={fetchedData} />
				|| fetchedData.title} */}
			{/* ЗДЕСЬ ОБЯЗАТЕЛЬНО НУЖНО ВЫЯСНИТЬ ПОЧЕМУ ТАК ПРИВОДИТ К ОШИБКЕ ПРИ ПЕРЕЗАГРУЗКЕ */}
			
    </div>
  );
}
