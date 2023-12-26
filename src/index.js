import "dotenv/config";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MobileProvider } from "./context/MobileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<MobileProvider>
			<App />
		</MobileProvider>
	</BrowserRouter>
);
