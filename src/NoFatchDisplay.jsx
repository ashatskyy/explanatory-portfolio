export function NoFatchDisplay({ isDark}) {
  return (
		<div className={`noFatchMessageBlock ${isDark ? "noFatchMessageBlock-dark" : ""}`}>
			<div>
				An error occurred. Either the engine you request does not exist or there
      was another issue processing your request.
				</div>
     
    </div>
  );
}
