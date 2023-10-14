import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function allProducts() {
  const router = useRouter();
  const [productList, setProductList] = useState([]);

  const fetchProductList = async (values) => {
    const res = await fetch("http://localhost:3005/products");
    const data = await res.json();
    setProductList(data);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async (values) => {
    const res = await fetch("http://localhost:3005/categories");
    const data = await res.json();
    setCategoryList(data);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categoryList.find(
      (category) => category._id === categoryId
    );
    return category ? category.name : "Unknown";
  };

  return (
    <>
      <div>
        <div className="p-5 h-screen bg-gray-100">
          <h1 className="text-xl mb-2">All Products</h1>
          <button
            onClick={() => router.push("/admin/products/create")}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            ADD PRODUCT
          </button>

          <div className="overflow-auto rounded-lg shadow md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    Product Image
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Product Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Category
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Price
                  </th>
                </tr>
              </thead>
              {productList.map((item) => (
                <tbody className="divide-y divide-gray-100" key={item._id}>
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Image
                        src={item.productImagePath}
                        alt="Product Image"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 rounded-lg">
                        {getCategoryNameById(item.category)}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      ${item.price}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default allProducts;
