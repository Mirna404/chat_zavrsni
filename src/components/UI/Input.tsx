import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "./Button";

const Input = () => {
	const [inputValue, setInputValue] = useState("");
	return (
		<div className="flex flex-row justify-around">
			<label htmlFor="Message"></label>
			<input
				type="text"
				id="message"
				placeholder="Type your message.."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="rounded-l w-full h-10 border-gray-800 border-2 bg-white text-gray-800"
			/>

			<button type="submit" className="text-white px-4 py-3 bg-blue-700">
				Pošalji
			</button>
		</div>
	);
};

export default Input;
