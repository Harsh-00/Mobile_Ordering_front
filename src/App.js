import "./App.css";
import Navbar from "./comp/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mobile from "./pages/Mobile";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";

function App() {
	return (
		<div className="">
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/mobiles" element={<Mobile />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	);
}

export default App;
