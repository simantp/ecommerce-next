import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { setLoginDetails } from "../../redux/reducerSlices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function Signin() {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignin = async (values) => {
    const res = await fetch("http://localhost:3005/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.isLoggedIn) {
      dispatch(setLoginDetails(data));
      router.push("/");
    }

    toast({
      title: data.msg,
      status: res.status == 404 ? "warning" : "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
              handleSignin(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <Field
                      name="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="flex mt-2 mb-2 items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm flex justify-center">
                      <Link
                        href="#"
                        className="font-semibold text-slate-800 hover:text-slate-600"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <Field
                    type="password"
                    name="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Need an Account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-slate-800 hover:text-slate-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
