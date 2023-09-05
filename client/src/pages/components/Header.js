import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducerSlices/userSlice";
import { useToast } from "@chakra-ui/react";

function Header() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const logOut = () => {
    const logoutData = {
      msg: "You have been logged out.",
    };

    dispatch(logout(logoutData));

    toast({
      title: logoutData.msg,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };
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
              src="/images/logo.png"
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
              className="input w-full imput-sm input-bordered"
              placeholder="Search"
            />
          </div>
        </div>

        <div>
          <Link href="/cart">
            <RiShoppingBag3Fill className="h-10 text-4xl" />
          </Link>
        </div>
      </div>
      {/* bottom nav */}
      <div className="bg-theme_blue-light">
        <div className="layout flex justify-between">
          <div className="flex justify-start text-white items-center text-xs sm:text-base space-x-5 p-2 pl-6">
            <p className="link">All Products</p>
            <p className="link">About</p>
            <p className="link">Sale</p>
            <p className="link hidden lg:inline-flex">Process</p>
            <p className="link hidden lg:inline-flex">How to Order</p>
          </div>
          {/* right */}
          <div className="text-white items-center">
            <div className="flex justify-center items-center text-xs sm:text-base space-x-5 p-2 pl-6">
              {!isLoggedIn ? (
                <Link href="/signin">
                  <p className="link">Sign In</p>
                </Link>
              ) : (
                <p className="hidden lg:inline-flex">
                  Hello Simant -{" "}
                  <span onClick={logOut} className="link">
                    {" "}
                    Sign Out
                  </span>
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
