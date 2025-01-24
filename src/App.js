import "./App.css";
import Navbar from "./comp/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Mobile from "./pages/Mobile";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Failed from "./pages/Failed"; 
import Orders from "./pages/Orders";
import Compare from "./pages/Compare";
import { useContext } from "react";
import { MobileContext } from "./context/MobileContext";
import { Navigate } from "react-router-dom";  
import MobileDetail from "./pages/MobileDetail";

function App() {
	const loc = useLocation(); 
	const {user}= useContext(MobileContext);
	return ( 
		<div className=""  >
			{loc.pathname !== "/login" && <Navbar />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={user ? <Navigate to="/mobiles" /> : <Navigate to="/login" />} />
				<Route path="/mobiles" element={user ? <Mobile /> : <Navigate to="/login" />} />
				<Route path="/mobiles/:id" element={user ? <MobileDetail/> : <Navigate to="/login" />} />
				<Route path="/add-product" element={ user ? <AddProduct /> : <Navigate to="/login" />} />
				<Route path="/wishlist" element={ user ? <WishList /> : <Navigate to="/login" />} />
				<Route path="/orders" element={ user ? <Orders /> : <Navigate to="/login" />} />
				<Route path="/cart" element={ user ? <Cart /> : <Navigate to="/login" />} />
				<Route path="/success" element={ user ? <Success /> : <Navigate to="/login" />} />
				<Route path="/failed" element={ user ? <Failed /> : <Navigate to="/login" />} />
				<Route path="/compare" element={ user ? <Compare /> : <Navigate to="/login" />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</div>
	);
}

export default App;
