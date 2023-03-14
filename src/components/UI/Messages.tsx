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
		<>
			{messages.map((message) => (
				<MessageInstance messageData={message} myId={myId} />
			))}
		</>
	);
}
