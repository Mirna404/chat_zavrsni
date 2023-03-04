import React from "react";

export const Button = ({ sendBtntxt }: any) => {
	return (
		<button type="submit" className="text-white px-4 py-3 bg-blue-700">
			{sendBtntxt}
		</button>
	);
};
