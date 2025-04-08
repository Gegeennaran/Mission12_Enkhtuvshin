import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.itemAmount * item.price,
    0,
  );
  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                <strong>{item.title}</strong>
                <br />
                Quantity: {item.itemAmount}
                <br />
                Price Per Item: ${item.price}
                <br />
                Subtotal: ${item.itemAmount * item.price}
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total:{totalPrice}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}
export default CartPage;
