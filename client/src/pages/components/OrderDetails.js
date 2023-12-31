import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const { userDetails } = useSelector((state) => state.user);

  const fetchUserOrders = async () => {
    try {
      const res = await fetch(`http://localhost:3005/order/${userDetails._id}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0 && data[0].orders) {
        setOrders(data[0].orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userDetails._id]);

  return (
    <>
      <div className="mt-5">
        {orders.map((order, index) => (
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
};

export default OrderDetails;
