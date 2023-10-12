import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [orderList, setOrderList] = useState([]);
  const { userDetails } = useSelector((state) => state.user);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("http://localhost:3005/user/" + userDetails._id);
      const data = await res.json();

      if (data) {
        setOrderList(data.userDetails.orderData);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {}, [orderList]);

  return (
    <>
      <div className="mt-5">
        <div className="overflow-auto rounded-lg shadow md:block">
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
                  Price
                </th>
              </tr>
            </thead>
            {orderList.map((item) => (
              <tbody className="divide-y divide-gray-100" key={item._id}>
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.price}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
