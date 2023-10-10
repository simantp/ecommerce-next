import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { changeUserDetails } from "../../redux/reducerSlices/userSlice";

const AccountEditSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  country: Yup.string(),
  streetAddress: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
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
            Edit your Details
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
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
              <Form className="space-y-6" method="post">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <Field
                      name="firstName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div>{errors.firstName}</div>
                    ) : null}
                  </div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      name="lastName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div>{errors.lastName}</div>
                    ) : null}
                  </div>

                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Street Address
                  </label>
                  <div className="mt-2">
                    <Field
                      name="streetAddress"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.streetAddress && touched.streetAddress ? (
                      <div>{errors.streetAddress}</div>
                    ) : null}
                  </div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <Field
                      name="city"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city && touched.city ? (
                      <div>{errors.city}</div>
                    ) : null}
                  </div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    State
                  </label>
                  <div className="mt-2">
                    <Field
                      name="state"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.state && touched.state ? (
                      <div>{errors.state}</div>
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
