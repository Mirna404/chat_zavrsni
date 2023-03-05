import React from "react";

interface MessagesProps {
	messages: Array<Message>;
	thisMember: Member;
	username: String;
}

interface Message {
	member: { username: string; id?: string };
	data: string;
	timestamp: string;
	id: string;
}

interface Member {
	username: string;
	id: string;
	clientData?: { [key: string]: any };
}

export default function Messages({
	messages,
	thisMember,
	username,
}: MessagesProps) {
	function renderMessage(message: Message, index: number) {
		const { member, data, timestamp, id } = message;
		const thisMemberMsg = member.id === thisMember.id;
		const convertUnixTimestamp = (timestamp: number) => {
			const date = new Date(timestamp * 1000);
			return date.toLocaleString();
		};

		return (
			// <li className={classNameLi} key={id} data-id={member.id}>
			<div className="flex flex-col" key={id} data-id={member.id}>
				<div className="">
					<div className="">
						<span className="">{username}</span>
					</div>
					<div
						className=" border-2 bg-chat-gray flex text-white text-sm rounded-xl h-10 w-fit mx-5 p-4 items-center"
						title={convertUnixTimestamp(parseInt(timestamp))}
					>
						{data}
					</div>
				</div>
			</div>
		);
	}

	return <>{messages.map(renderMessage)}</>;
}
