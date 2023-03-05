import React, { useState } from "react";

interface RegistrationProps {
	handleRegFormSubmit: (username: string) => void;
}

const Registration: React.FC<RegistrationProps> = ({ handleRegFormSubmit }) => {
	const [username, setUsername] = useState("");

	const getUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleRegFormSubmit(username);
	};

	return (
		<div className="flex justify-center py-6 text-white">
			<form className="flex gap-4" onSubmit={submitForm}>
				<input
					className="input-username-style"
					type="text"
					placeholder="Enter username..."
					required
					onChange={getUsername}
				/>

				<button
					className="bg-chat-orange border-4 border-chat-blue hover:opacity-80 text-white rounded-2xl p-2"
					type="submit"
				>
					Start chatting
				</button>
			</form>
		</div>
	);
};

export default Registration;
