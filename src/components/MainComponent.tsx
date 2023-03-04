import React from "react";
import { useEffect } from "react";
import ChatSidebar from "./UI/ChatSidebar";
import Chat from "./UI/Chat";

const MainComponent = () => {
	return (
		<div className="flex flex-row w-full min-h-[90vh]">
			<ChatSidebar />
			<Chat />
		</div>
	);
};

export default MainComponent;
