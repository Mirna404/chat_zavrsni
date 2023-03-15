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
	console.log(messageClass + "ovoooo");
	return (
		<div
			key={id}
			className={`my-2 mx-4 flex w-[90%] ${
				messageClass ? "justify-end items-end" : "justify-start"
			}`}
		>
			<div
				className={`w-2/3 rounded-xl ${
					messageClass ? "bg-chat-orange" : "bg-chat-blue2"
				}`}
			>
				<div className="px-4 py-2  text-white">
					<p
						className={`text-sm font-semibold ${
							messageClass ? "text-chat-blue" : "text-chat-orange"
						}`}
					>
						{member.clientData.username}
					</p>
					<p className="text-sm">{data}</p>
					<p className="text-xs text-right text-gray-300">
						{convertUnixTimestamp(timestamp)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MessageInstance;
