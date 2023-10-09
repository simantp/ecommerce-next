import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../../redux/reducerSlices/productSlice";
import { useRouter } from "next/router";

const CartProduct = ({ item }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isCheckoutPage = router.pathname === "/checkout";
  return (
    <div className="bg-gray-100 p-5 rounded-lg flex items-center gap-4">
      <Image
        className="object-cover"
        width={80}
        height={80}
        src={item.productImagePath}
        alt="productImage"
      />
      <div className="flex items-center w-full justify-between px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold">
              <FormattedPrice amount={item.price} />
            </span>
          </p>
          {isCheckoutPage && (
            <p className="text-sm text-gray-600">
              Quantity <span>{item.quantity}</span>
            </p>
          )}
          {!isCheckoutPage && (
            <div className="flex items-center gap-6">
              <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                <span
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
                        _id: item._id,
                        price: item.price,
                        title: item.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                >
                  <LuMinus />
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={() =>
                    dispatch(
                      increaseQuantity({
                        _id: item._id,
                        category: item.category,
                        price: item.price,
                        title: item.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                >
                  <LuPlus />
                </span>
              </div>

              <div
                onClick={() => dispatch(deleteProduct(item._id))}
                className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
              >
                <IoMdClose className="mt-[2px]" /> <p>remove</p>
              </div>
            </div>
          )}
        </div>
        <div className="text-lg font-semibold">
          <FormattedPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
