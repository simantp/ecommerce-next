import React from "react";
import Header from "./Header";
import HeaderMenu from "./HeaderMenu";

function RootLayout({ children }) {
  return (
    <>
      <Header />
      <HeaderMenu />
      {children}
    </>
  );
}

export default RootLayout;
