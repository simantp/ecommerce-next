import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import Link from "next/link";
import CartPayment from "../components/CartPayment";

function Cart() {
  const { cartList } = useSelector((state) => state.product);
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4">
      {cartList.length > 0 ? (
        <>
          <div className="bg-white col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold ">Shopping Cart</p>
              <p className="text-lg font-semibold">Subtotal</p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {cartList.map((item) => (
                <div key={item._id}>
                  <CartProduct item={item} />
                </div>
              ))}
              {/* <ResetCart /> */}
            </div>
          </div>
          <div className="bg-white h-64 col-span-1 p-4 rounded-lg flex items-center justify-center">
            <CartPayment />
          </div>
        </>
      ) : (
        <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 text-black bg-gray-300 rounded-lg text-sm font-semibold hover:bg-black hover:text-white">
              Go To Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
