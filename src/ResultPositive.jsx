import React, { useRef } from "react";

// export function ResultPositive({ fetchedData, isDark, sharedFont, handleWordByRef }) {
export function ResultPositive({
  fetchedData,
  sharedFont,
  isDark,
  handleWordByRef,
}) {
  const audioRef = useRef(null);
  const audioSrc = fetchedData.audio;

  const playAudio = () => {
    if (audioSrc !== "") {
      audioRef.current.play();
    }
  };

  const isPlayable = audioSrc !== "";

  return (
    <>
      <div className="section-orthography">
        <div className="spelling-transcription">
          <h1
            className={`word ${
              fetchedData.word.length > 14 ? "word-long" : ""
            }`}
          >
            {fetchedData.word}
          </h1>
          <p className="phonetic">{fetchedData.phonetic}</p>
        </div>
        <div className="prononciation-audio">
          <audio ref={audioRef} src={audioSrc} />
          <button
            onClick={isPlayable ? playAudio : null}
            className={`button ${isPlayable ? "playable" : "no-playable"}`}
            disabled={!isPlayable}
          ></button>
        </div>
      </div>

      <div className="section-semantics">
        {[
          "noun",
          "pronoun",
          "verb",
          "adjective",
          "adverb",
          "preposition",
          "conjunction",
          "interjection",
        ].map((el) =>
          fetchedData[el].definitions.length > 0 ? (
            <React.Fragment>
              <div className="inline-wrapper">
                <p
                  className="part-of-speech"
                  style={
                    sharedFont === "InterVariable"
                      ? { fontVariationSettings: '"slnt" -10' }
                      : { fontStyle: "normal" }
                  }
                >
                  {el}
                </p>

                <hr className="hr" />
              </div>

              <p className="word-meaning-synonym ">Meaning</p>
              <div className="meanigs-examples-block">
                {fetchedData[el].definitions.map((definition, index) => (
                  <React.Fragment key={index}>
                    <p className="meanig">
                      {definition[definition.length - 1] !== "."
                        ? definition + "."
                        : definition}
                    </p>
                    {fetchedData[el].examples[index] ? (
                      <p className="example">
                        {fetchedData[el].examples[index]}
                      </p>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ))}
              </div>
              {fetchedData[el].synonyms.length > 0 ? (
                <div className="synonyms-block">
                  <div className="word-synonym">Synonyms</div>
                  <div className="synonyms">
                    {fetchedData[el].synonyms?.map((el, index, arr) => (
                      <>
                        <span
                          className="wordRef"
                          onClick={() => handleWordByRef(el)}
                        >
                          {el}
                        </span>
                        {index < arr.length - 1 && ", "}
                      </>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </React.Fragment>
          ) : (
            ""
          )
        )}
        <div className="inline-wrapper">
          <hr className="hr" />
        </div>

        <div className="ref">
          <p
            className={
              sharedFont === "Inconsolata"
                ? "word-source"
                : "word-source-underscore"
            }
          >
            Source
          </p>
					<div className="test-block">
            <a
              href={fetchedData.source[fetchedData.source.length - 1]}
              target="_blank"
              rel="noopener noreferrer"
              className={
                sharedFont === "Inconsolata"
                  ? `a-text ${isDark ? "a-text-is-dark" : ""}`
                  : fetchedData.source[fetchedData.source.length - 1].length <
                    40
                  ? isDark
                    ? "a-text-underscore-is-dark"
                    : "a-text-underscore"
                  : `a-text ${isDark ? "a-text-is-dark" : ""}`
              }
            >
              {`${fetchedData.source[fetchedData.source.length - 1]} `}
            </a>
            <img className="a-pic" src="./images/icon-new-window.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
