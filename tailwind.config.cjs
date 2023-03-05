/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter"],
			inter: ["Inter", "sans-serif"],
		},
		extend: {
			colors: {
				chat: {
					blue: "#0B4F6C", //Indigo blue
					blue2: "rgba(11, 79, 108, 0.95)", //Blue with opacity for login modal bg
					orange: "#FC5130", //Tomato orange
					ghost: "#FBFBFF", //Ghost white
					gray: "#757575",
				},
			},
		},
		screens: {
			md: { max: "767px" }, // => @media (max-width: 767px)
		},
		backgroundImage: {
			send: "url('/src/assets/send.svg')", //Send message svg
			"main-bg2": "url('/src/assets/bg_doodles.png')", //Doodle background img
		},
	},
	plugins: [],
};
