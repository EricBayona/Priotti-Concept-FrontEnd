import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ product }) {
  const id = product._id || product.id;
  const name = product.title || product.name || "Producto";
  const price = product.price ?? product.unit_price ?? 0;
  const img =
    product.thumbnails?.[0] ||
    "https://via.placeholder.com/600x800?text=Priotti+Concept";

  return (
    <article className="group border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-sm transition">
      <Link to={`/productos/${id}`} className="block">
        <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-1">{name}</h3>
          <p className="text-sm mt-1">
            ${Number(price).toLocaleString("es-AR")}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          className="w-full text-sm px-3 py-2 rounded-xl border border-neutral-900 hover:bg-neutral-900 hover:text-white transition"
          onClick={() => alert("Próximamente: agregar al carrito")}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
