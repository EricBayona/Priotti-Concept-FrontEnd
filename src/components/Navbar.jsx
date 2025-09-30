import { Link, NavLink } from "react-router-dom";
import React from "react";
import { MapPin, ShoppingCart } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContex";
import CartWidget from "./CartWidget";

export default function Navbar() {
  const { user, logoutUser } = useUser();
  const { clearCartState } = useCart();

  return (
    <>
      <div>
        <p className="bg-emerald-600 text-white text-center py-2 text-sm font-medium tracking-wide">
          ENVÍO GRATIS EN COMPRAS MAYORES A $60000
        </p>
        {user && (
          <div className="bg-gray-100 border-t border-gray-300 px-4 py-2 flex justify-between items-center text-sm">
            <span className="text-gray-700">
              Hola, <strong>{user.fullName}</strong>
            </span>
            <button
              onClick={() => {
                logoutUser();
                clearCartState();
              }}
              className="text-red-600 hover:underline transition"
            >
              Cerrar sesión
            </button>
          </div>
        )}
        {!user && (
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-center text-sm text-gray-500">
            Bienvenido a nuestra tienda
          </div>
        )}
      </div>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="flex flex-wrap md:flex-nowrap items-center px-4 gap-x-4 gap-y-2 justify-center">
          <Link to="/" className="text-xl font-semibold tracking-wide">
            Priotti Concept
          </Link>

          <nav className="flex flex-wrap md:flex-nowrap items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              <MapPin className="text-sm text-neutral-600 hover:text-neutral-900" />
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              Registrarse
            </NavLink>
            <CartWidget />
          </nav>
        </div>
      </header>
    </>
  );
}
