import { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card({ foodOptions, foodItems }) {
  const priceOptions = Object.keys(foodOptions).filter((key) => key !== "_id");

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();
  const finalPrice = qty * parseInt(foodOptions[size]);
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItems._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItems._id,
          price: finalPrice,
          qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty,
          size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      price: finalPrice,
      qty,
      size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <img
        src={foodItems.img}
        className="card-img-top"
        alt="..."
        style={{ height: "150px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{foodItems.name}</h5>
        {/* <p className="card-text">This is food text</p> */}
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100  bg-success rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((quantity) => {
              return (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className={"btn btn-success justify-center ms-2"}
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
