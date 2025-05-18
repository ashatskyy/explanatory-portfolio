export function populateWordFromData(data, wordInstance) {
  wordInstance.word = data[0].word;
  wordInstance.phonetic = data[0].phonetic;

  for (let i = 0; i < data[0].phonetics.length; i++) {
    if (data[0].phonetics[i].audio) {
      wordInstance.audio = data[0].phonetics[i].audio;
    }
  }
  wordInstance.source = wordInstance.source.concat(data[0].sourceUrls);

  for (let y = 0; y < data.length; y++) {
    for (let i = 0; i < data[y].meanings.length; i++) {
      const lexeme = data[y].meanings[i].partOfSpeech;

      [
        "noun",
        "pronoun",
        "adjective",
        "verb",
        "adverb",
        "preposition",
        "conjunction",
        "interjection",
      ].forEach((el) => {
        if (lexeme === el) {
          for (let e = 0; e < data[y].meanings[i].definitions.length; e++) {
            wordInstance[lexeme].definitions.push(
              data[y].meanings[i].definitions[e].definition
            );
            data[y].meanings[i].definitions[e].example
              ? wordInstance[lexeme].examples.push(
                  `"${data[y].meanings[i].definitions[e].example}"`
                )
              : wordInstance[lexeme].examples.push("");
          }
          wordInstance[lexeme].synonyms = [
            ...new Set(
              wordInstance[lexeme].synonyms.concat(data[y].meanings[i].synonyms)
            ),
          ];
        }
      });
    }
  }

  return wordInstance;
}