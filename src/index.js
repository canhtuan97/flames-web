import React from "react";
import ReactDOM from "react-dom";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import {
    BrowserRouter as Router,
  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import 'antd/dist/antd.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import 'aos/dist/aos.css'; // You can also use <link> for styles

function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Router>
                <App />
                <ToastContainer />
            </Router>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
