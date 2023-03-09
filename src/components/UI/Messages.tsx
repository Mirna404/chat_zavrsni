interface Message {
	data: string;
	timestamp: string;
	id: string;
	member: string;
}

interface Member {
	username: string;
}

interface MessagesProps {
	messages: Message[];
}

export default function Messages({ messages }: MessagesProps) {
	function renderMessage(message: Message, index: number) {
		const { member, data, timestamp, id } = message;
		const convertUnixTimestamp = (timestamp: number) => {
			const date = new Date(timestamp * 1000);
			return date.toLocaleString();
		};

		return (
			<div key={id} className="my-2">
				<div className="px-4 py-2 rounded-xl bg-yellow-300 max-w-[80%]">
					<p className="text-xs font-semibold ">{message.member}</p>
					<p className="text-sm">{data}</p>
					<p className="text-xs text-right">
						{convertUnixTimestamp(parseInt(timestamp))}
					</p>
				</div>
			</div>
		);
	}

	return <>{messages.map(renderMessage)}</>;
}
