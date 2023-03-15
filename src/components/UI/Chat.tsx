import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import Messages from "./Messages";
import Input from "./Input";

interface Drone {
	clientId: string;
	close(): void;
	subscribe(room: string): Room;
	publish(data: any): void;
}

interface Room {
	on(event: string, callback: Function): void;
}

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
	const [drone, setDrone] = useState<Drone | null>(null);
	const [activeUsers, setActiveUsers] = useState([]);

	useEffect(() => {
		let newDrone: any;
		if (chat.member.username !== "") {
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
			const room = drone.subscribe("observable-AlgebraZavrsni");
			room.on("members", function (members: any) {
				setActiveUsers(members);
			});
			room.on("message", (message: MessageType) => {
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

	return chat.member.username ? (
		<div className="h-[80vh] absolute w-96 md:w-[90vw] bg-chat-ghost rounded-2xl main-div-shadow">
			<div className="flex flex-col items-start w-full h-[70vh] max-h-5/6 rounded-t-2xl justify-end">
				<Messages messages={chat.messages} myId={chat.member.id} />
			</div>
			<div className="bg-chat-ghost h-[10vh] main-div-shadow  rounded-b-2xl">
				<Input onSendMessage={onSendMessage} />
			</div>
		</div>
	) : (
		<div className="bg-chat-blue2 h-2/3 flex flex-col justify-center items-center px-12 py-16 rounded-xl text-white main-div-shadow md:w-4/5 md:h-[70vh]">
			<h1 className="text-2xl text-center">Welcome to a simple Chat App</h1>
			<h2 className="text-base py-2 text-center">
				Enter your username and start chatting!
			</h2>
			<Registration handleRegFormSubmit={handleRegFormSubmit} />
		</div>
	);
};
export default Chat;
