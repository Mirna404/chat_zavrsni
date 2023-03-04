import React, { useEffect, useState } from "react";
import Input from "./Input";
import Message from "./Message";
// const messageFromMe = member.id === currentMember.id;  ovo je kontrola da li je moja poruka
// const className = messageFromMe ?
// "Messages-message currentMember" : "Messages-message";
const Chat = () => {
	const [messages, setMessages] = useState(
		JSON.parse(localStorage.getItem("messages")) || []
	);
	const [inputValue, setInputValue] = useState("");
	console.table(messages);
	useEffect(() => {
		localStorage.setItem("messages", JSON.stringify(messages));
	}, [messages]);

	const drone = new Scaledrone("wh7R1LadIE1FZWjd");
	drone.on("error", (error) => console.error(error));

	const room = drone.subscribe("observable-AlgebraZavrsni");
	room.on("message", (message, member) => {
		// Add new message to existing messages array
		const updatedMessages = [...messages, message];

		// Store updated messages array back to local storage
		localStorage.setItem("messages", JSON.stringify(updatedMessages));

		// Update state with new messages array
		setMessages(updatedMessages);
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const newMessage = { text: inputValue };
		drone.publish({
			room: "AlgebraZavrsni",
			message: newMessage,
		});
		setMessages([...messages, newMessage]);
		setInputValue("");
	};

	const handleChange = (e: any) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="bg-red-400 w-full relative" id="chat">
			{messages.map((message, index) => (
				<Message key={index} messageText={message.text} />
			))}

			<div className="bottom-0 absolute w-full">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-row justify-around">
						<label htmlFor="Message"></label>
						<input
							type="text"
							id="message"
							placeholder="Type your message.."
							value={inputValue}
							onChange={handleChange}
							autoFocus
							autoComplete="false"
							className="rounded-l w-full h-10 border-gray-800 border-2 bg-white text-gray-800"
						/>

						<button type="submit" className="text-white px-4 py-3 bg-blue-700">
							Pošalji
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Chat;
