import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { useCart } from "../context/CartContex.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.payload);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Cargando producto...</p>
    );
  if (!product)
    return (
      <p className="text-center mt-10 text-red-500">Producto no encontrado</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <img
        src={
          product.thumbnails?.[0] ||
          "https://via.placeholder.com/600x600?text=Priotti+Concept"
        }
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {product.title}
        </h2>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600 mb-6">
          ${product.price}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
