import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { changeUserDetails } from "../../redux/reducerSlices/userSlice";
import { useDisclosure } from "@chakra-ui/react";

const AccountEditSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.number().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const EditAccount = ({ onClose }) => {
  const { userDetails } = useSelector((state) => state.user);
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
      onClose();
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              userName: userDetails.userName,
              phoneNumber: userDetails.phoneNumber,
              email: userDetails.email,
            }}
            validationSchema={AccountEditSchema}
            onSubmit={(values) => {
              editUserDetails(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6" method="post">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      name="userName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.userName && touched.userName ? (
                      <div>{errors.userName}</div>
                    ) : null}
                  </div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <Field
                      name="phoneNumber"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div>{errors.phoneNumber}</div>
                    ) : null}
                  </div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
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

                    <button
                      type="submit"
                      className="mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
