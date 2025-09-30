import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const categorias = [
  "Remeras",
  "Pantalones",
  "Vestidos",
  "Abrigos",
  "Top",
  "Accesorios",
  "Ver todos",
];

export default function CategoriasMenu({ onSelectCategoria }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Desktop: menú horizontal */}
      <nav className="hidden md:flex justify-center gap-6 border-b border-gray-200 py-2 bg-white">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategoria(cat)}
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Mobile: botón hamburguesa */}
      <div className="md:hidden flex items-center justify-between border-b border-gray-200 py-2 px-4 bg-white">
        <h2 className="text-lg font-semibold">Categorías</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile: panel lateral */}
      {open && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-md z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <Link to="/" className="text-xl font-semibold tracking-wide mb-4">
                Priotti Concept
              </Link>
            </div>
            <div className="flex justify-between items-center my-4">
              <h3 className="text-lg font-semibold">Categorías</h3>
              <button onClick={() => setOpen(false)}>
                <X className="cursor-pointer h-6 w-6 text-gray-700" />
              </button>
            </div>
            <ul className="space-y-3">
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategoria(cat);
                      setOpen(false);
                    }}
                    className="cursor-pointer w-full text-left text-gray-700 hover:text-black transition"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <CartWidget />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
