import FormattedPrice from "./FormattedPrice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CartPayment = () => {
  const { cartList } = useSelector((state) => state.product);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    cartList.map((item) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [cartList]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg font-bold text-indigo-700">CHECKOUT</p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      <div className="flex flex-col items-center">
        <button className="w-full h-10 text-sm font-semibold  text-white bg-gray-500 rounded-lg hover:bg-gray-300  hover:text-black duration-300">
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
