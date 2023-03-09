import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button } from "./Button";
import SendBtn from "../../assets/send.svg";

interface Props {
	onSendMessage: (message: string) => void;
}

export default function Input({ onSendMessage }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	const initialState = {
		text: "",
	};

	const [state, setState] = useState(initialState);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setState({ text: e.target.value });
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (state.text === "") {
			inputRef.current?.setAttribute(
				"placeholder",
				"You need to enter something..."
			);
		} else {
			onSendMessage(state.text);
			setState({ text: "" });
			inputRef.current?.focus();
		}
	}

	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		inputRef.current?.focus();
		const input = inputRef.current;
		if (input) {
			input.value = input.value + e.currentTarget.innerHTML;
			setState({ text: input.value });
		}
	}

	return (
		<div className="absolute bottom-0 w-full">
			<form
				className="flex items-center justify-around"
				onSubmit={(e) => onSubmit(e)}
			>
				<input
					className="p-4 w-full h-10 m-2 border-chat-blue2 border-2 rounded-xl bg-white text-gray-800 focus:outline-chat-orange"
					onChange={(e) => onChange(e)}
					value={state.text}
					type="text"
					placeholder="Start typing your message..."
					ref={inputRef}
					autoFocus={true}
				/>
				<button className="bg-chat-ghost hover:opacity-60 text-white rounded-[50px] p-2 mr-2">
					<img src={SendBtn} alt="Send" />
				</button>
			</form>
		</div>
	);
}
