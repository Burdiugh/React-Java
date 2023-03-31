import { AxiosResponse } from "axios";
import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http_common";

interface IAddCategoryDTO {
  name: string;
  image: string;
  description: string;
}

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const addItemToDb = (
    item: IAddCategoryDTO
  ): Promise<AxiosResponse<IAddCategoryDTO>> => {
    return http.post("api/categories", item);
  };

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;

    if (files) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (data) => {
        const result = data.target?.result as string;

        setFieldValue("image", result);
      };
    }
    target.value = "";
  };

  const onSubmitHandler = async (values: IAddCategoryDTO) => {
    try {
      console.log("values", values);

      const response = await addItemToDb(values);
      navigate("/categories");
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues: IAddCategoryDTO = {
    name: "",
    description: "",
    image: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
    //enableReinitialize: true,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="w-full max-w-xs">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="categoryname"
                  type="text"
                  placeholder="Category name"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Description..."
                  name="description"
                />
              </div>
              <div className="mb-4">
                {/* 
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="base64"
                >
                  Add image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="base64"
                  type="file"
                  onChange={onFileChangeHandler}
                /> */}
                <label
                  htmlFor="selectImage"
                  className="inline-block w-20 overflow-hidden bg-gray-100"
                >
                  {values.image === "" ? (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <img src={values.image} />
                  )}
                </label>
                <label
                  htmlFor="selectImage"
                  className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Select photo
                </label>
                <input
                  type="file"
                  id="selectImage"
                  className="hidden"
                  onChange={onFileChangeHandler}
                />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
            <Link
              to="/"
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default AddCategoryPage;
