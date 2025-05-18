import { useState, useRef, useEffect } from "react";

import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";

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
    <div>
      <h1>Search Request: {stringForSearch}</h1>
      <p>Search Result: <b>{fetchedData?.word || fetchedData?.title}</b></p>
    </div>
  );
}