import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducerSlices/productSlice";

export default function ProductCard({ productData }) {
  const dispatch = useDispatch();

  return (
    <>
      {productData.map(({ _id, title, slug, price, productImagePath }) => (
        <div
          key={_id}
          className="relative m-10 flex items-center w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <Link
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href={{
              pathname: `product/${slug}`,
            }}
          >
            <img
              className="object-cover text-center"
              src={productImagePath}
              alt="product image"
            />
          </Link>
          <div className="flex flex-col items-center mt-4 px-5 pb-5">
            <Link
              href={{
                pathname: `product/${slug}`,
              }}
            >
              <h5 className="text-xl tracking-tight font-bold text-slate-900">
                {title}
              </h5>
            </Link>
            <div className="mt-2 mb-5 flex items-center">
              <p>
                <span className="text-2xl text-slate-900">${price}</span>
              </p>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: _id,
                    title: title,
                    price: price,
                    productImagePath: productImagePath,
                    quantity: 1,
                  })
                )
              }
              className="rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
