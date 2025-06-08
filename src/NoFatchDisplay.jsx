// export function NoFatchDisplay({ isDark }) {

import { useEffect, useState } from "react";

function DelayedComponent({ reload, isDark}) {
  return (
		<div className={`cont ${isDark ? "cont-dark" : ""}`}>
		
	
      <div className="b1">
        <svg
          className="icon-info"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
      </div>
			<div className={`b2 ${isDark ? "b2-dark" : ""}`}>
        An error occurred. Either the engine you request does not exist or there
        was another issue processing your request.

      </div>
      <div className="b3">
				{/* <button className={ `bu ${isDark? "bu-dark":"" }`} style={{ border: '1px solid black' }} onClick={ reload}> */}
				<button className="bu" style={{ border: '1px solid black' }} onClick={ reload}>
          <svg
            className="icon-retry"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Retry
        </button>
      </div>
    </div>
  );
}

export function NoFatchDisplay({ reload, isDark }) {

	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), 1500); // 10 seconds
		return () => clearTimeout(timer); // cleanup on unmount
	}, []);

	return (
		<div>
		
			{show && <DelayedComponent reload={reload} isDark={isDark} />}
		</div>
	);
}