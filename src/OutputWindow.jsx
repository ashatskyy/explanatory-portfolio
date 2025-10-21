import { useState, useEffect } from "react";

import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";
import { ResultPositive } from "./ResultPositive";
import { ResultNegative } from "./ResultNegative";
import { NoFatchDisplay } from "./NoFatchDisplay";

export function OutputWindow({
  stringForSearch,
  sharedFont,
  isDark,
  scrollToTop,
  handleRefInput,
	reload,

	setIsLoading,
	isLoading
	
}) {
  const [fetchedData, setFetchedData] = useState(null);
  
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
		
		
		 if (!request || !request.trim()) {
   
    setIsLoading(false);
    return;
  }

		setIsLoading(true); 
		
			setFetchedData(null);

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
      
        setFetchedData({ status: "Error", message: "Failed to fetch." });
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, [request,setIsLoading]);

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
        <p>Loading...</p>
      ) : fetchedData?.word ? (
        <ResultPositive
          fetchedData={fetchedData}
          sharedFont={sharedFont}
          isDark={isDark}
          handleWordByRef={handleWordByRef}
        />
      ) : fetchedData &&
        Object.prototype.hasOwnProperty.call(fetchedData, "title") ? (
   
        <ResultNegative isDark={isDark} request={request} />
      ) : (
        <NoFatchDisplay isDark={isDark} reload={reload} />
      )}
    </div>
  );
}
