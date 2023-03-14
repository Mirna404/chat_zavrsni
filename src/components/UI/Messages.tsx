interface Message {
	data: string;
	timestamp: string;
	id: string;
	user: string;
}

interface Member {
	user: string;
}

interface MessagesProps {
	messages: Message[];
	sender: string;
}

export default function Messages({ messages, sender }: MessagesProps) {
	function renderMessage(message: Message, index: number) {
		const { user, data, timestamp, id } = message;
		const convertUnixTimestamp = (timestamp: number) => {
			const date = new Date(timestamp * 1000);
			return date.toLocaleString();
		};
		console.log(sender);

		return (
			<div key={id} className="my-2 mx-4">
				{/* <div className={` ${sender ? "bg-red-500" : "bg-blue-400"}`}> */}
				<div className="px-4 py-2 rounded-xl bg-chat-gray text-white">
					{/* <div
					className={`flex flex-col h-[70vh] main-div rounded-t-2xl overflow-auto justify-end ${
						isSender ? "items-end" : "items-start"
					}`}
				> */}
					<p className="text-sm font-semibold text-chat-orange">{user}</p>
					<p className="text-sm">{data}</p>
					<p className="text-xs text-right text-gray-300">
						{convertUnixTimestamp(parseInt(timestamp))}
					</p>
				</div>
				{/* </div> */}
			</div>
		);
	}

	return <>{messages.map(renderMessage)}</>;
}
