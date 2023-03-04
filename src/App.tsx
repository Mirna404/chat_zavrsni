import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<MainComponent />
			<Footer />
		</>
	);
}

export default App;
