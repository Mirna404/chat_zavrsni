import { Member, MessageType } from "./Chat";
import MessageInstance from "./MessageInstance";

export default function Messages({
	messages,
	myId,
}: {
	messages: MessageType[];
	myId: string;
}) {
	return (
		<div className="overflow-y-auto w-full">
			{messages.map((message) => (
				<MessageInstance messageData={message} myId={myId} />
			))}
		</div>
	);
}
