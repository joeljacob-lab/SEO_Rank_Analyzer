// src/main.jsx
import "./index.css";
import App from "./App"; // No need for .tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </ThemeProvider>
    </BrowserRouter>
);
