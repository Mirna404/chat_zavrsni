import React from "react";
import { useEffect } from "react";
import Chat from "./UI/Chat";

const MainComponent = () => {
	return (
		<div className="bg-main-bg2 bg-cover bg-no-repeat  md:bg-cover flex flex-row justify-center items-center w-full min-h-[87vh]">
			<Chat />
		</div>
	);
};

export default MainComponent;
