import { useLocation, useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function ShoppingCard() {
  const navigate = useNavigate();
  const { title, bookID } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const price = Number(query.get("price"));
  const { addToCart } = useCart();
  const [itemAmount, setShoppingAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No Book found",
      itemAmount,
      price,
    };
    addToCart(newItem);
    navigate("/cart");
  };
  return (
    <>
      <WelcomeBand />
      <h2>Shopping Card</h2>
      <br />
      <h2>Add {title} to cart</h2>
      <p>Price: ${price}</p>
      <div>
        <input
          type="number"
          placeholder="Enter amount"
          value={itemAmount}
          onChange={(x) => setShoppingAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate("/")}> Go back</button>
    </>
  );
}

export default ShoppingCard;
