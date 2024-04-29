import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MobileProvider } from "./context/MobileContext";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MobileProvider>
      <ChakraProvider>
        <Toaster />
        <App />
      </ChakraProvider>
    </MobileProvider>
  </BrowserRouter>
);
