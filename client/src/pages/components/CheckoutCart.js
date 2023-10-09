import FormattedPrice from "./FormattedPrice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CheckoutCart = () => {
  const router = useRouter();
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
        <button
          onClick={() => router.push(`/checkout?totalAmount=${totalAmount}`)}
          className="w-full p-4 text-white bg-gray-500 rounded-lg hover:bg-gray-300  hover:text-black"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutCart;
