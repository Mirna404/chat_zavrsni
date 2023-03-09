import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import Messages from "./Messages";
import Input from "./Input";
interface ChatState {
	member: Member;
	messages: Message[];
}
interface Message {
	member: string;
	data: string;
	timestamp: string;
	id: string;
}
interface Member {
	username: string;
}
const initialChatState: ChatState = {
	member: { username: "" },
	messages: [] as Message[],
};
const Chat: React.FC = () => {
	const [chat, setChat] = useState(initialChatState);
	const [drone, setDrone] = useState<typeof Scaledrone | null>(null);
	const [username, setUsername] = useState("");
	const [activeUsers, setActiveUsers] = useState([]);

	useEffect(() => {
		if (!chat.member) {
			return;
		}
		const drone = new Scaledrone("wh7R1LadIE1FZWjd", {
			data: chat.member,
		}) as Scaledrone & { clientId?: string };
		drone.on("open", (error?: Error) => {
			if (error) {
				return console.error(error);
			}
			setChat((prevState) => ({ ...prevState, member: chat.member }));
			const room = drone.subscribe("observable-AlgebraZavrsni");
			room.on("members", function (members: any) {
				console.log(members);
				setActiveUsers(members);
			});
			room.on("member_join", function (member: any) {
				// Member object                setActiveUsers(activeUsers.push(member))
			});
			room.on("message", (message: Message) => {
				const { data, timestamp, id, member } = message;
				let user = member.clientData?.username;
				const newMessage = {
					user,
					data,
					timestamp,
					id,
				};
				console.log(newMessage);
				setChat((prevState) => ({
					...prevState,
					messages: [...prevState.messages, newMessage],
				}));
			});
		});
		setDrone(drone);
		return () => {
			drone.close();
		};
	}, [chat.member]);
	const handleRegFormSubmit = (username: string) => {
		setUsername(username);
		const newMember: Member = {
			username: username,
		};
		setChat((prevState) => ({ ...prevState, member: newMember }));
	};
	const onSendMessage = (message: string) => {
		if (drone) {
			drone.publish({
				room: "observable-AlgebraZavrsni",
				message,
			});
		}
	};
	return chat.member.username ? (
		<div className="bg-chat-ghost h-[70vh] w-1/3 main-div absolute rounded-2xl">
			{" "}
			<div className="flex flex-col items-start h-5/6 justify-end">
				{" "}
				<Messages messages={chat.messages} />{" "}
			</div>{" "}
			<div className="h-1/10">
				{" "}
				<Input onSendMessage={onSendMessage} />{" "}
			</div>{" "}
		</div>
	) : (
		<div className="bg-chat-blue2 h-2/3 flex flex-col justify-center items-center px-12 py-16 rounded-xl text-white">
			{" "}
			<h1 className="text-2xl">Welcome to a simple Chat App!</h1>{" "}
			<h2 className="text-base py-2">
				{" "}
				Enter your username and start chatting!{" "}
			</h2>{" "}
			<Registration handleRegFormSubmit={handleRegFormSubmit} />{" "}
		</div>
	);
};
export default Chat;
