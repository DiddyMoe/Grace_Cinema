// Importing necessary modules
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

// Importing custom components and styles
import "./index.css";
import App from "./App";
import store from "./store/store";
import "react-toastify/dist/ReactToastify.css";

// Creating a root element for React to render
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component wrapped in necessary providers and containers
root.render(
 <React.StrictMode>
   <Provider store={store}>
     <Router>
       <ToastContainer />
       <App />
     </Router>
   </Provider>
 </React.StrictMode>
);
