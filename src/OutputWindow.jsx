import { useState, useEffect } from "react";

import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";
import { ResultPositive } from "./ResultPositive";
import { ResultNegative } from "./ResultNegative";

export function OutputWindow({ stringForSearch, sharedFont, isDark, scrollToTop, handleRefInput }) {
	const [fetchedData, setFetchedData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [request, setRequest] = useState(stringForSearch);

	const handleWordByRef = (wordRef) => {
		scrollToTop();
		handleRefInput(wordRef);
		setRequest(wordRef);
	};

	useEffect(() => {
		setRequest(stringForSearch);
	}, [stringForSearch]);

	useEffect(() => {
		if (!request.trim()) return;

		setIsLoading(true); //start loading

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
				setFetchedData({ title: "Error", message: "Failed to fetch." });
			})
			.finally(() => {
				setIsLoading(false); //end loading
			});
	}, [request]);

	useEffect(() => {
		console.log("Fetched data updated:", fetchedData);
	}, [fetchedData]);

	return (
		<div
			className="output"
			style={{
				fontFamily:
					sharedFont === "Lora"
						? "Lora, serif"
						: sharedFont === "InterVariable"
						? "InterVariable, sans-serif"
						: "Inconsolata, monospace",
			}}
		>
			{isLoading ? (
				// <p>Loading...</p> 
				<p>{''}</p> 
			) : fetchedData?.word ? (
				<ResultPositive
					fetchedData={fetchedData}
					sharedFont={sharedFont}
					isDark={isDark}
					handleWordByRef={handleWordByRef}
				/>
			) : fetchedData && Object.prototype.hasOwnProperty.call(fetchedData, "title") ? (
				<ResultNegative isDark={isDark} request={request} />
			) : null}
		</div>
	);
}
