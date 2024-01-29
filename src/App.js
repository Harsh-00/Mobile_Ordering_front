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

function App() {
	const loc = useLocation();
	return (
		<div className="">
			{loc.pathname !== "/login" && <Navbar />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
				<Route path="/mobiles" element={<Mobile />} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/wishlist" element={<WishList />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	);
}

export default App;
