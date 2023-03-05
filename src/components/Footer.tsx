import React from "react";

const Footer = () => {
	return (
		<div className="w-screen bg-chat-blue text-white min-h-[5vh] flex justify-center items-center">
			<div className="text-sm flex justify-center gap-1">
				<p>Copyright</p>
				&copy;
				<a href="https://www.linkedin.com/in/mirnabusic/" target="_blank">
					Mirna Bušić
				</a>
			</div>
		</div>
	);
};

export default Footer;
