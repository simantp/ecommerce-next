import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddCategorySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  slug: Yup.string().required("Required"),
});

export default function AddCategory() {
  const createProduct = async (values) => {
    const res = await fetch("http://localhost:3005/addcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Category
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              name: "",
              slug: "",
            }}
            validationSchema={AddCategorySchema}
            onSubmit={async (values, { resetForm }) => {
              await createProduct(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6" method="post">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category Name
                  </label>
                  <Field
                    name="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Slug
                  </label>
                  <Field
                    name="slug"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.slug && touched.slug ? (
                    <div>{errors.slug}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Category
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
