import "./App.css";
import Navbar from "./comp/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mobile from "./pages/Mobile";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import WishList from "./pages/WishList";

function App() {
	return (
		<div className="">
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/mobiles" element={<Mobile />} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/wishlist" element={<WishList />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	);
}

export default App;
