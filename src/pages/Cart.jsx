import React from "react";
import { useCart } from "../context/CartContex";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, falseCart, removeFromCart, clearCart } = useCart();
  const { user } = useUser();

  const total =
    cart.length > 0
      ? cart.reduce((acc, item) => {
          if (!item?.product || typeof item.product.price !== "number")
            return acc;
          return acc + item.product.price * item.quantity;
        }, 0)
      : falseCart.reduce((acc, item) => {
          if (!item?.product || typeof item.product.price !== "number")
            return acc;
          return acc + item.product.price * item.quantity;
        }, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://priotti-concept-backend.onrender.com/api/carts/mycart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const cartId = data.payload._id;

      const pucharseRes = await fetch(
        `https://priotti-concept-backend.onrender.com/api/carts/${cartId}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pucharseData = await pucharseRes.json();

      if (!pucharseRes.ok) {
        alert("Error en la compra" + pucharseData.message);
        return;
      }

      console.log("✅ Ticket creado:", pucharseData);

      const paymentRes = await fetch(
        `https://priotti-concept-backend.onrender.com/api/payment/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentData = await paymentRes.json();
      window.location.href = paymentData.init_point;
    } catch (error) {
      console.error("Error al generar checkout:", error);
      alert("Hubo un problema al procesar tu pago. Por favor inicie Sesión");
    }
  };

  // Si no hay productos en ningún carrito
  if (cart.length === 0 && falseCart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío 🛒</h1>
        <Link
          to="/productos"
          className="inline-block px-4 py-2 rounded-xl border border-neutral-900 hover:bg-neutral-900 hover:text-white transition"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>

      {/* Carrito real */}
      {cart.length > 0 && (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div>
                <h2 className="font-semibold">{item.product.title}</h2>
                <img
                  src={
                    item.product.thumbnails?.[0] ||
                    "https://via.placeholder.com/600x600?text=Priotti+Concept"
                  }
                  alt={item.product.title}
                  className="w-full max-w-[100px] aspect-square object-cover rounded-lg shadow-lg"
                />
                <p className="text-sm text-neutral-600">
                  {item.quantity} x ${item.product.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Carrito temporal sin sesión */}
      {!user && falseCart.length > 0 && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600 mb-2">
            Productos guardados sin sesión:
          </p>
          {falseCart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border p-4 rounded-lg bg-white"
            >
              <div>
                <h2 className="font-semibold">{item.product.title}</h2>
                <img
                  src={
                    item.product.thumbnails?.[0] ||
                    "https://via.placeholder.com/600x600?text=Priotti+Concept"
                  }
                  alt={item.product.title}
                  className="w-full max-w-[100px] aspect-square object-cover rounded-lg shadow-lg"
                />
                <p className="text-sm text-neutral-600">
                  {item.quantity} x ${item.product.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span>${total}</span>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-lg border border-neutral-900 hover:bg-neutral-900 hover:text-white transition"
          >
            Vaciar carrito
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}
