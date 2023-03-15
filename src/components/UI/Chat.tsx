import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import Messages from "./Messages";
import Input from "./Input";
interface ChatState {
	member: Member;
	messages: MessageType[];
}
export interface MessageType {
	member: { clientData: Member; id: string };
	data: string;
	timestamp: number;
	id: string;
}
export interface Member {
	username: string;
	id: string;
}
const initialChatState: ChatState = {
	member: { username: "", id: "" },
	messages: [] as MessageType[],
};
const Chat: React.FC = () => {
	const [chat, setChat] = useState(initialChatState);
	const [drone, setDrone] = useState(null);
	const [username, setUsername] = useState("");
	const [activeUsers, setActiveUsers] = useState([]);
	const [isSender, setIsSender] = useState<null | boolean>(null);
	useEffect(() => {
		let newDrone: any;
		if (chat.member.username !== "") {
			console.log("initing new drone");
			console.log("With:");
			console.log(chat.member);
			newDrone = new Scaledrone("wh7R1LadIE1FZWjd", {
				data: chat.member,
			});
			newDrone.on("open", (error?: Error) => {
				if (error) {
					return console.error(error);
				}
				setDrone(newDrone);
				setChat((prev) => ({
					...prev,
					member: { ...prev.member, id: newDrone.clientId },
				}));
			});
		}
		return () => {
			if (newDrone && chat.member) {
				newDrone.close();
			}
		};
	}, [chat.member.username]);
	useEffect(() => {
		if (drone && chat.member.username) {
			console.log("Drone is:");
			console.log(drone);
			const room = drone.subscribe("observable-AlgebraZavrsni");
			room.on("members", function (members: any) {
				setActiveUsers(members);
			});
			room.on("message", (message: MessageType) => {
				console.log(message);
				setChat((prev) => ({
					...prev,
					messages: [...prev.messages, message],
				}));
			});
		}
	}, [drone]);
	const handleRegFormSubmit = (newUser: string) => {
		setChat((prev) => ({
			...prev,
			member: { ...prev.member, username: newUser },
		}));
	};
	const onSendMessage = (message: string) => {
		if (drone) {
			drone.publish({
				room: "observable-AlgebraZavrsni",
				message,
			});
		}
	};

	console.log(chat.member.username + "ovaj consolelog");
	return chat.member.username ? (
		<div className="h-[80vh] absolute w-1/3 bg-chat-ghost rounded-t-2xl">
			<div className="flex flex-col items-start h-[70vh] main-div rounded-t-2xl overflow-auto justify-end">
				<div className="flex flex-col items-start w-full max-h-5/6 justify-end">
					<Messages messages={chat.messages} myId={chat.member.id} />
				</div>
			</div>
			<div className="bg-chat-ghost h-[10vh] main-div  rounded-b-2xl">
				<Input onSendMessage={onSendMessage} />
			</div>
		</div>
	) : (
		<div className="bg-chat-blue2 h-2/3 flex flex-col justify-center items-center px-12 py-16 rounded-xl text-white">
			<h1 className="text-2xl">Welcome to a simple Chat App!</h1>
			<h2 className="text-base py-2">Enter your username and start chating!</h2>
			<Registration handleRegFormSubmit={handleRegFormSubmit} />
		</div>
	);
};
export default Chat;
