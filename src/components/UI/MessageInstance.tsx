import React from "react";
import { MessageType } from "./Chat";

const MessageInstance = ({
	messageData,
	myId,
}: {
	messageData: MessageType;
	myId: string;
}) => {
	const { member, data, timestamp, id } = messageData;

	const convertUnixTimestamp = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleString();
	};

	const messageClass = myId === messageData.member.id;

	return (
		<div
			key={id}
			className={`my-2 mx-4 flex w-[90%] ${
				messageClass ? "justify-end" : "justify-start"
			}`}
		>
			<div
				className={`w-max rounded-xl px-4 py-2 flex flex-col ${
					messageClass
						? " bg-chat-orange items-end"
						: " bg-chat-blue2 items-start"
				}`}
			>
				<p
					className={`text-sm font-semibold  ${
						messageClass ? "text-chat-blue" : "text-chat-orange"
					}`}
				>
					{member.clientData.username}
				</p>
				<p className="text-sm text-white">{data}</p>
				<p className="text-xs text-right text-gray-300">
					{convertUnixTimestamp(timestamp)}
				</p>
			</div>
		</div>
	);
};

export default MessageInstance;
