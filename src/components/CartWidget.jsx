import React from "react";
import { useCart } from "../context/CartContex";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function CartWidget() {
  const { cartBadge } = useCart();
  return (
    <div className="flex items-center text-gray-800 hover:text-gray-800 p-4">
      <Link to="/carrito" className=" inline-flex ml-1" title="Carrito">
        <ShoppingCart className="h-6 w-6 text-neutral-700" />
        <span className=" ml-1"> {cartBadge()}</span>
      </Link>
    </div>
  );
}
export default CartWidget;
