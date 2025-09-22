import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";
import React from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.payload.docs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Cargando productos...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Nuestros Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/productos/${product._id}`}
            key={product._id}
            className="block border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={
                product.thumbnails?.[0] ||
                "https://via.placeholder.com/400x400?text=Priotti+Concept"
              }
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
