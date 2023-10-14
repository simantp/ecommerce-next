import { useEffect, useState } from "react";

function allOrders() {
  const [allOrderList, setAllOrderList] = useState([]);

  const fetchOrderList = async () => {
    try {
      const res = await fetch("http://localhost:3005/order");
      const data = await res.json();
      setAllOrderList(data);
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="mt-5">
      {allOrderList.map((user, userIndex) => (
        <div
          key={userIndex}
          className="my-8 overflow-auto rounded-lg shadow md:block"
        >
          <div>
            <h2>User Information</h2>
            <p>User Name: {user.user.userName}</p>
            <p>Phone Number: {user.user.phoneNumber}</p>
            <p>Email: {user.user.email}</p>
          </div>

          {user.orders.map((order, orderIndex) => (
            <div key={orderIndex}>
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
                {order.orderList.map((item, itemIndex) => (
                  <tbody className="divide-y divide-gray-100" key={itemIndex}>
                    <tr className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.title}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        Rs: {item.price}
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
      ))}
    </div>
  );
}

export default allOrders;
