import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function allCategories() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  const fetchCategoryList = async (values) => {
    const res = await fetch("http://localhost:3005/categories");
    const data = await res.json();
    setCategoryList(data);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      <div>
        <div className="p-5 h-screen bg-gray-100">
          <h1 className="text-xl mb-2">All Categories</h1>
          <button
            onClick={() => router.push("/admin/category/create")}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            ADD CATEGORY
          </button>

          <div className="overflow-auto rounded-lg shadow md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Slug
                  </th>
                </tr>
              </thead>
              {categoryList.map((item) => (
                <tbody className="divide-y divide-gray-100" key={item._id}>
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 rounded-lg">
                        {item.slug}
                      </span>
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

export default allCategories;
