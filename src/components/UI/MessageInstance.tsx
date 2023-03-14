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

	const messageClass = myId === messageData.member.id ? "self" : "other";
	console.log(member + "ov");
	return (
		<div key={id} className="my-2 mx-4">
			<div className={`message ${messageClass}`}>
				<div className="px-4 py-2 rounded-xl bg-chat-gray text-white">
					<p className="text-sm font-semibold text-chat-orange">
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
