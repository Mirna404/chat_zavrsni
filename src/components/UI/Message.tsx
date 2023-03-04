import React from "react";

const Message = ({ messageText }: any) => {
	return (
		<div className="border-4 bg-black text-white rounded-md h-10 w-1/3">
			{messageText}
		</div>
	);
};

export default Message;
