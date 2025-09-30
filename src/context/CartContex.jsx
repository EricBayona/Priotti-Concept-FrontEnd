import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "./UserContext";
import api from "../services/api";

// Creamos el contexto
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token, cid } = useUser();
  const [falseCart, setFalseCart] = useState(() => {
    const stored = localStorage.getItem("falseCart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("falseCart", JSON.stringify(falseCart));
  }, [falseCart]);

  useEffect(() => {
    if (token) {
      setFalseCart([]);
      localStorage.removeItem("falseCart");
    }
  }, [token]);

  const loadCart = async () => {
    if (!token) return;
    try {
      const { data } = await api.get("/api/carts/mycart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.payload.products || []);
    } catch (error) {
      console.error("Error cargando carrito:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // Agregar producto al carrito
  const addToCart = async (product, quantity = 1) => {
    if (!user || !cid || !token) {
      setFalseCart((prev) => {
        const index = prev.findIndex(
          (item) => item.product._id === product._id
        );
        if (index !== -1) {
          const updated = [...prev];
          updated[index].quantity += quantity;
          return updated;
        } else {
          return [...prev, { product, quantity }];
        }
      });

      return toast(
        "Producto guardado. Iniciá sesión para agregarlo al carrito"
      );
    }

    try {
      toast.success("Agregado al carrito");
      await api.post(
        `/api/carts/${cid}/product/${product._id}`,
        { quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await loadCart();
    } catch (error) {
      console.error("Error agregando producto al carrito:", error);
    }
  };

  const removeFromCart = async (product) => {
    if (!token) {
      setFalseCart((prev) =>
        prev.filter((item) => item.product._id !== product)
      );
      return toast("Producto eliminado del carrito temporal");
    }

    try {
      await api.delete(`/api/carts/${cid}/product/${product}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await loadCart();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const clearCart = async () => {
    if (!token) {
      setFalseCart([]);
    }

    try {
      await api.delete(`/api/carts/${cid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error("Error vaciando carrito:", error);
    }
  };
  const clearCartState = () => {
    setCart([]);
  };

  const cartBadge = () => {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        clearCartState,
        falseCart,
        cartBadge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
