import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContex.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              // estilos por defecto
              duration: 500,
              style: {
                background: "#4ade80",
                color: "#ffffff",
                borderRadius: "0.5rem",
                padding: "0.75rem",
              },
              success: {
                // puedes personalizar solo el estilo de los success
                style: {
                  background: "#111",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                },
              },
            }}
          />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
