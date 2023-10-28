import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducerSlices/productSlice";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function ProductCard({ productData }) {
  const dispatch = useDispatch();
  const showAlert = () => {
    alert("Product added to the cart");
  };

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productData.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="layout mx-auto p-4">
      <div className="flex">
        {currentItems.map(({ _id, title, price, productImagePath }) => (
          <div
            key={_id}
            className=" m-10 flex items-center w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href={{
                pathname: `product/${_id}`,
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
                  pathname: `product/${_id}`,
                }}
              >
                <h5 className="text-xl tracking-tight font-bold text-slate-900">
                  {title}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center">
                <p>
                  <span className="text-2xl text-slate-900">Rs {price}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: _id,
                      title: title,
                      price: price,
                      productImagePath: productImagePath,
                      quantity: 1,
                    })
                  );
                  showAlert();
                }}
                className="rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="mt-4 flex justify-center"
          pageLinkClassName="px-3 py-2 mx-1 bg-gray-200 rounded-md"
          previousLinkClassName="px-3 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md"
          nextLinkClassName="px-3 py-2 mx-1 bg-gray-200 text-gray-800 rounded-md"
          activeLinkClassName="px-3 py-2 mx-1 bg-slate-900 text-white rounded-md"
        />
      </div>
    </div>
  );
}
