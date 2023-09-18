import { useEffect, useState } from "react";
import Image from "next/image";

function allProducts() {
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
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Actions
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
                      {item.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 rounded-lg">
                        {getCategoryNameById(item.category)}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      ${item.price}
                    </td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">
                      <p>Edit</p>
                      <p>Delete</p>
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
