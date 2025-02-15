import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const domRoot = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(domRoot);

reactRoot.render(
    <StrictMode>
        <App />
    </StrictMode>
);