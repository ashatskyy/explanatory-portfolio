import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';

export function ResultNegative ({ isDark, request }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timeOfDelay = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timeOfDelay);
  }, [request]);

  return (
		<>
			<Helmet>
				<title>{`${request} - No Definitions Found. English Explanatory Dictionary Online.`}</title>
				<meta
					name="description"
					content={`No Definitions, meaning, or usage of the word "${request}" was found in English Explanatory Dictionary Online.`}
				/>
				<meta
					property="og:title"
					content={`${request} - English Explanatory Dictionary Online.`}
				/>
				<meta
					property="og:description"
					content={`No Definitions, meaning, or usage of the word "${request}" was found in English Explanatory Dictionary Online.`}
				/>
			</Helmet>
			<>
      {(show && request)&&(
        <div className="error-container-main">
          <div className="request-display"><h1 className="wordNotfinde" lang="en">{request}</h1></div>

          <h2 className={`no-definitions-h2 ${isDark ? "no-definitions-h2-dark" : ""}`}>
            No Definitions Found
          </h2>

          <p className="no-definitions-p">
            Sorry pal, we couldn't find definitions you were looking for.
            You can try the search again at a later time or head to the web instead.
          </p>
        </div>
				)}
				</>
    </>
  );
}
