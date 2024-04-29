import "./App.css";
import Navbar from "./comp/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Mobile from "./pages/Mobile";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Test from "./pages/Test";

function App() {
	const loc = useLocation();
	return (
		<div className="">
			{loc.pathname !== "/login" && <Navbar />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/mobiles" element={<Home />} />
				<Route path="/" element={<Mobile />} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/wishlist" element={<WishList />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/test" element={<Test/>} />

				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	);
}

export default App;
