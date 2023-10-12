import { useEffect, useState } from "react";

function allOrders() {
  const [orderList, setOrderList] = useState([]);

  const fetchOrderList = async (values) => {
    const res = await fetch("http://localhost:3005/order");
    const data = await res.json();
    setOrderList(data);
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <>
      <div className="mt-5">
        {orderList.map((order, index) => (
          <div
            key={index}
            className="my-8 overflow-auto rounded-lg shadow md:block"
          >
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Product Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Quantity
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Unit Price
                  </th>
                </tr>
              </thead>
              {order.orderList?.map((item, itemIndex) => (
                <tbody className="divide-y divide-gray-100" key={itemIndex}>
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      Rs :{item.price}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className="flex items-center justify-between bg-gray-300 p-2 rounded-lg shadow">
              <p className="font-semibold">ORDER ID : {order._id}</p>
              <p className="font-semibold">ORDER TOTAL : Rs {order.total}</p>
              <p className="font-semibold">
                ORDER STATUS : {order.orderStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default allOrders;
