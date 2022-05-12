import React from "react";

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className="white f3">
				{`${name}, Your Face Detecting Count is `}
			</div>
			<div className="white f3">
				{entries}
			</div>
		</div>
	)
}


export default Rank;