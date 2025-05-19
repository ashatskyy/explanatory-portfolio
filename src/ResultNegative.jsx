import { useState, useEffect } from "react";

export function ResultNegative ({ isDark, request }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timeOfDelay = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timeOfDelay);
  }, [request]);

  return (
    <>
      {(show && request)&&(
        <div className="error-container-main">
          <div className="request-display"><p lang="en">{request}</p></div>

          <h1 className={`no-definitions-h1 ${isDark ? "no-definitions-h1-dark" : ""}`}>
            No Definitions Found
          </h1>

          <p className="no-definitions-p">
            Sorry pal, we couldn't find definitions you were looking for.
            You can try the search again at a later time or head to the web instead.
          </p>
        </div>
      )}
    </>
  );
}
