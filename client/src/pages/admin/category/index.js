import { useEffect, useState } from "react";

function allCategories() {
  const [categoryList, setCategoryList] = useState([]);

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
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Actions
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
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 rounded-lg">
                        Edit
                      </span>
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 rounded-lg">
                        Delete
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
