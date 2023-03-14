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
}

export default function Messages({ messages, sender }: MessagesProps) {
	function renderMessage(message: Message, index: number) {
		const { user, data, timestamp, id } = message;
		const convertUnixTimestamp = (timestamp: number) => {
			const date = new Date(timestamp * 1000);
			return date.toLocaleString();
		};

		const messageClass = sender === sender ? "self" : "other";

		return (
			<div key={id} className="my-2 mx-4">
				<div className={`message ${messageClass}`}>
					<div className="px-4 py-2 rounded-xl bg-chat-gray text-white">
						<p className="text-sm font-semibold text-chat-orange">{user}</p>
						<p className="text-sm">{data}</p>
						<p className="text-xs text-right text-gray-300">
							{convertUnixTimestamp(parseInt(timestamp))}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return <>{messages.map(renderMessage)}</>;
}
