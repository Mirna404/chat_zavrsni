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
		const classNameLi = thisMemberMsg
			? "msg-list__msg msg-list__msg--thisMember"
			: "msg-list__msg";

		const classNameMemberData = thisMemberMsg
			? "msg-list__member-data msg-list__member-data--thisMember"
			: "msg-list__member-data";

		return (
			// <li className={classNameLi} key={id} data-id={member.id}>
			<li
				className="overflow-auto flex flex-col-reverse"
				key={id}
				data-id={member.id}
			>
				<div className="">
					<div className={classNameMemberData}>
						<span className="msg-list__username">{username}</span>
					</div>
					<div
						className="msg-list__text border-2 bg-chat-gray flex text-white text-sm rounded-xl h-10 w-fit mx-5 p-4 items-center"
						title={convertUnixTimestamp(parseInt(timestamp))}
					>
						{data}
					</div>
				</div>
			</li>
		);
	}

	return (
		<ul className="msg-list h-[88%] flex flex-col-reverse">
			{messages.map(renderMessage)}
		</ul>
	);
}
