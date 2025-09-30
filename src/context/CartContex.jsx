import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "./UserContext";

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
      const res = await fetch("http://localhost:8080/api/carts/mycart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
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
      await fetch(
        `http://localhost:8080/api/carts/${cid}/product/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );
      await loadCart();
      toast.success("Agregado al carrito");
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
      await fetch(`http://localhost:8080/api/carts/${cid}/product/${product}`, {
        method: "DELETE",
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
      await fetch(`http://localhost:8080/api/carts/${cid}`, {
        method: "DELETE",
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
