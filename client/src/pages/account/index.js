import React, { useState } from "react";
import Profile from "../components/Profile";
import Address from "../components/Address";
import OrderDetails from "../components/OrderDetails";

function Account() {
  const [selectedComponent, setSelectedComponent] = useState(<Profile />);
  const [activeButton, setActiveButton] = useState("Profile");

  const renderComponent = (component, buttonLabel) => {
    setSelectedComponent(component);
    setActiveButton(buttonLabel);
  };

  const Button = ({ label, component }) => (
    <button
      onClick={() => renderComponent(component, label)}
      className={`mb-3 ${
        label === activeButton
          ? "bg-theme_blue-light"
          : "bg-white text-theme_blue-light hover:bg-theme_blue-light hover:text-white"
      } text-white font-bold py-2 px-4 rounded`}
    >
      {label}
    </button>
  );

  return (
    <div className=" layout flex p-10">
      <div className="w-1/4 p-4 flex flex-col">
        <Button label="Profile" component={<Profile />} />
        <Button label="Shipping Details/Address" component={<Address />} />
        <Button label="Order Details" component={<OrderDetails />} />
      </div>

      <div className="w-3/4 p-4">{selectedComponent}</div>
    </div>
  );
}

export default Account;
