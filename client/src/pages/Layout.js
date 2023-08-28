import React from "react";
import Header from "./components/Header";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <HeaderMenu />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
