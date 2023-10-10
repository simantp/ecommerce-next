import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { changeUserDetails } from "../../redux/reducerSlices/userSlice";
import CartProduct from "../components/CartProduct";
import FormattedPrice from "../components/FormattedPrice";
import { useEffect, useState } from "react";
import Link from "next/link";

const AccountEditSchema = Yup.object().shape({
  phoneNumber: Yup.number().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});

export default function Checkout() {
  const { cartList } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.user);
  const [shipToThisAddress, setShipToThisAddress] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const res = await fetch("http://localhost:3005/user/" + userDetails._id);
    const data = await res.json();
    if (data) {
      dispatch(changeUserDetails(data.userDetails));
    }
  };

  const editUserDetails = async (values) => {
    const res = await fetch(
      "http://localhost:3005/account/" + userDetails._id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    if (res.status == 200) {
      fetchUserDetails();
    }
  };

  useEffect(() => {
    let amt = 0;
    cartList.map((item) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [cartList]);

  return (
    <div className="layout py-5 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className="lg:col-span-3 mt-15 px-5">
        {!isLoggedIn && (
          <div className="mt-20 py-20 bg-white rounded-lg shadow-lg">
            <div className="flex text-center justify-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Already Have an Account
              </h2>
              <Link href="/signin" className="px-3 text-center text-blue-500">
                Sign In
              </Link>
            </div>
            <div className="flex text-center justify-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Don't have an Account
              </h2>
              <Link href="/register" className="px-3 text-center text-blue-500">
                Register
              </Link>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div className="bg-white rounded-lg shadow-lg p-5">
            <Formik
              initialValues={{
                phoneNumber: userDetails.phoneNumber,
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                country: userDetails.country,
                streetAddress: userDetails.streetAddress,
                city: userDetails.city,
                state: userDetails.state,
              }}
              validationSchema={AccountEditSchema}
              onSubmit={(values) => {
                editUserDetails(values);
              }}
            >
              {({ errors, touched }) => (
                <Form method="post">
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Shipping Details
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive your
                        order.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First Name
                          </label>
                          <div className="mt-2">
                            <Field
                              name="firstName"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.firstName && touched.firstName ? (
                              <div>{errors.firstName}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <Field
                              name="lastName"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.lastName && touched.lastName ? (
                              <div>{errors.lastName}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <Field
                              name="email"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.email && touched.email ? (
                              <div>{errors.email}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="contact"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Contact Number
                          </label>
                          <div className="mt-2">
                            <Field
                              name="phoneNumber"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                              <div>{errors.phoneNumber}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <Field
                              name="country"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.country && touched.country ? (
                              <div>{errors.country}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="streetAddress"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street Address
                          </label>
                          <div className="mt-2">
                            <Field
                              name="streetAddress"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.streetAddress && touched.streetAddress ? (
                              <div>{errors.streetAddress}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <Field
                              name="city"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.city && touched.city ? (
                              <div>{errors.city}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <Field
                              name="state"
                              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                shipToThisAddress ? "bg-gray-200" : ""
                              }`}
                              disabled={shipToThisAddress}
                            />
                            {errors.state && touched.state ? (
                              <div>{errors.state}</div>
                            ) : null}
                            <button
                              type="submit"
                              className={`mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                shipToThisAddress
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={shipToThisAddress}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Confirm Your Delivery Information
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="confirmShipping"
                          name="confirmShipping"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) =>
                            setShipToThisAddress(e.target.checked)
                          }
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="confirmShipping"
                          className="font-medium text-gray-900"
                        >
                          Ship to this Address
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Method
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="paymentMethod"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value="cash"
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash On Delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="paymentMethod"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value="card"
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white col-span-4 p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold ">Cart Summary</p>
            <p className="text-lg font-semibold">Subtotal</p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            {cartList.map((item) => (
              <div key={item._id}>
                <CartProduct item={item} />
              </div>
            ))}
          </div>
          <p className="flex items-center justify-between p-5 font-semibold">
            Total:{" "}
            <span className="font-bold text-xl">
              <FormattedPrice amount={totalAmount} />
            </span>
          </p>
          {isLoggedIn && (
            <Link href="#">
              <button
                className={`w-full p-3 h-10 text-sm font-semibold  text-white bg-blue-500 rounded-lg hover:bg-gray-300  hover:text-black duration-300 ${
                  !shipToThisAddress || !selectedPaymentMethod
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""
                }`}
                disabled={!shipToThisAddress || !selectedPaymentMethod}
              >
                Proceed to Payment
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
