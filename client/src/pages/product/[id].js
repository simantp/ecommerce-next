import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducerSlices/productSlice";

function ProductDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3005/product/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.productImagePath}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="text-gray-900">Rs {product.price}</span>
                </div>
              </div>
              <div className="w-1/2 px-2">
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        productImagePath: product.productImagePath,
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
