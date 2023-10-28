import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducerSlices/userSlice";
import { clearCart } from "../../redux/reducerSlices/productSlice";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.product);

  const handleSearch = () => {
    router.push(`/search?q=${searchQuery}`);
  };

  const toast = useToast();

  const logOut = () => {
    const logoutData = {
      msg: "You have been logged out.",
    };

    dispatch(clearCart());
    dispatch(logout());
  };

  const avatarImageUrl = userDetails?.avatarImage
    ? "http://localhost:3005/user-image/" + userDetails._id
    : "http://localhost:3000/images/defaultImg.png";
  return (
    <header className="bg-white border-b border-b-grey-300">
      {/* Top Nav */}
      <div className="layout flex items-center justify-between p-6 lg:px-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-secondary text-xl font-semibold"
          >
            <Image
              src={"/images/logo.png"}
              width={150}
              height={40}
              objectfit="contain"
              className="cursor-pointer mr-5"
            />
          </Link>
        </div>

        <div className="hidden lg:flex">
          <div className="join w-[30rem]">
            <input
              className="input w-full input-sm input-bordered"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            <div className=" w-8 h-8 rounded-full overflow-hidden border">
              <Image
                className="object-cover w-full h-full cursor-pointer link"
                src={avatarImageUrl}
                width={32}
                height={32}
                alt="User Image"
                onClick={() => router.push("/account")}
              />
            </div>
          ) : (
            ""
          )}
          <Link
            href={"/cart"}
            className="flex items-center  cursor-pointer duration-300 relative"
          >
            <RiShoppingBag3Fill className="h-8 text-4xl" />
            <span className="absolute bg-black text-white right-2.5 text-center h-4 w-4 text-sm font-bold">
              {cartList ? cartList.length : 0}
            </span>
          </Link>
        </div>
      </div>
      {/* bottom nav */}
      <div className="bg-theme_blue-light">
        <div className="layout flex justify-between">
          <div className="flex justify-start text-white items-center text-xs sm:text-base space-x-5 p-2 pl-6">
            <p className="link">All Products</p>
          </div>
          {/* right */}
          <div className="text-white px-4 items-center">
            <div className="flex justify-center items-center text-xs sm:text-base space-x-5 p-2 pl-6">
              {!isLoggedIn ? (
                <Link href="/signin">
                  <p className="link">Sign In</p>
                </Link>
              ) : (
                <p className="hidden lg:inline-flex link" onClick={logOut}>
                  Sign Out
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
