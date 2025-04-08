import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.itemAmount, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.itemAmount * item.price,
    0,
  );

  return (
    <div
      onClick={() => navigate("/cart")}
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontWeight: "bold",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      🛒{" "}
      <strong>
        {totalItems} items (${totalPrice})
      </strong>
    </div>
  );
};

export default CartSummary;
