import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  slug: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
});

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:3005/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const createProduct = async (productToAdd) => {
    const data = new FormData();
    Object.entries(productToAdd).forEach((item) => {
      data.append(item[0], item[1]);
    });
    data.append("productImage", file); // Change "products" to "productImage" to match your form field name

    try {
      const res = await fetch("http://localhost:3005/products", {
        method: "POST",
        body: data, // Send the FormData object
      });

      if (res.ok) {
        // Handle success
        // You can add code here to handle a successful response
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              slug: "",
              category: "",
              productImage: "",
            }}
            validationSchema={AddProductSchema}
            onSubmit={async (values, { resetForm }) => {
              const selectedCategoryId = values.category;
              const productToAdd = {
                name: values.name,
                description: values.description,
                price: values.price,
                slug: values.slug,
                category: selectedCategoryId,
                productImage: values.productImage,
              };
              await createProduct(productToAdd);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6" method="post">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Product Name
                  </label>
                  <Field
                    name="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <Field
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}

                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                  </label>
                  <div className="mt-2">
                    <Field
                      name="price"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.price && touched.price ? (
                      <div>{errors.price}</div>
                    ) : null}
                  </div>

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

                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  {errors.category && touched.category ? (
                    <div>{errors.category}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Product Image
                  </label>
                  <div className="form">
                    <input
                      type="file"
                      name="productImage"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Product
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
