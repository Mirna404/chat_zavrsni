// import React, { useEffect, useState } from "react";
// import Input from "./Input";
// import Message from "./Message";
// // const messageFromMe = member.id === currentMember.id;  ovo je kontrola da li je moja poruka
// // const className = messageFromMe ?
// // "Messages-message currentMember" : "Messages-message";
// const Chat = () => {
// 	const [messages, setMessages] = useState(
// 		JSON.parse(localStorage.getItem("messages")) || []
// 	);
// 	const [inputValue, setInputValue] = useState("");
// 	console.table(messages);
// 	useEffect(() => {
// 		localStorage.setItem("messages", JSON.stringify(messages));
// 	}, [messages]);

// 	const drone = new Scaledrone("wh7R1LadIE1FZWjd");
// 	drone.on("error", (error) => console.error(error));

// 	const room = drone.subscribe("observable-AlgebraZavrsni");
// 	room.on("message", (message, member) => {
// 		// Add new message to existing messages array
// 		const updatedMessages = [...messages, message];

// 		// Store updated messages array back to local storage
// 		localStorage.setItem("messages", JSON.stringify(updatedMessages));

// 		// Update state with new messages array
// 		setMessages(updatedMessages);
// 	});

// 	const handleSubmit = (e: any) => {
// 		e.preventDefault();
// 		const newMessage = { text: inputValue };
// 		drone.publish({
// 			room: "AlgebraZavrsni",
// 			message: newMessage,
// 		});
// 		setMessages([...messages, newMessage]);
// 		setInputValue("");
// 	};

// 	const handleChange = (e: any) => {
// 		setInputValue(e.target.value);
// 	};

// 	return (
// 		<div className="bg-chat-ghost w-full relative py-3" id="chat">
// 			{messages.map((message, index) => (
// 				<Message key={index} messageText={message.text} />
// 			))}

// 			<div className="bottom-0 absolute w-full">
// 				<form onSubmit={handleSubmit}>
// 					<div className="flex flex-row justify-between items-center gap-3 my-2 mx-5">
// 						<label htmlFor="Message"></label>
// 						<input
// 							type="text"
// 							id="message"
// 							placeholder="Type your message.."
// 							value={inputValue}
// 							onChange={handleChange}
// 							autoFocus
// 							autoComplete="false"
// 							className="rounded-xl w-full px-4 py-3 border-chat-blue border-2 bg-white text-gray-800"
// 						/>

// 						<button
// 							type="submit"
// 							className="text-white px-4 py-3 bg-chat-orange rounded-xl text-base"
// 						>
// 							Pošalji
// 						</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import Messages from "./Messages";
import Input from "./Input";
interface ChatState {
	member: Member;
	messages: Message[];
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

const initialChatState: ChatState = {
	member: { username: "", id: "" },
	messages: [],
};

const Chat: React.FC = () => {
	const [chat, setChat] = useState(initialChatState);
	const [drone, setDrone] = useState<Scaledrone | null>(null);

	useEffect(() => {
		if (chat.member.username !== "") {
			const drone = new Scaledrone("wh7R1LadIE1FZWjd", {
				data: chat.member,
			});
			setDrone(drone);
		}
	}, [chat.member]);

	useEffect(() => {
		if (drone) {
			drone.on("open", (error?: Error) => {
				if (error) {
					return console.error(error);
				}
				chat.member.id = drone.clientId;
				setChat({ ...chat, member: chat.member });

				const room = drone.subscribe("observable-AlgebraZavrsni");

				room.on("message", (message: Message) => {
					const { data, member, timestamp, id } = message;
					const newMessage = { member, data, timestamp, id };
					setChat((prevState) => ({
						...prevState,
						messages: [...prevState.messages, newMessage],
					}));
				});
			});
		}
	}, [drone]);

	const onSendMessage = (message: string) => {
		if (drone) {
			drone.publish({
				room: "observable-AlgebraZavrsni",
				message,
			});
		}
	};

	const handleRegFormSubmit = (username: string) => {
		chat.member = {
			username: username,
			id: "",
			clientData: {},
		};
		setChat({ ...chat, member: chat.member });
	};

	return chat.member.username === "" ? (
		<div className="bg-chat-blue2 h-2/3 flex flex-col justify-center items-center px-12 py-16 rounded-xl text-white">
			<h1 className="text-2xl">Welcome to a simple Chat App!</h1>
			<h2 className="text-base py-2">
				Enter your username and start chatting!
			</h2>
			<Registration handleRegFormSubmit={handleRegFormSubmit} />
		</div>
	) : (
		<div className="bg-chat-ghost h-[70vh] w-1/3 main-div absolute rounded-2xl">
			<Messages
				messages={chat.messages}
				thisMember={chat.member}
				username={chat.member.username}
			/>
			<Input onSendMessage={onSendMessage} />
		</div>
	);
};

export default Chat;
