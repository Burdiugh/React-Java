import axios, { AxiosResponse } from "axios";
import { Formik, Form, Field, useFormik, FormikProvider } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../../../http_common";

export interface ICategory {
  id: number;
  name: string;
}

const ContainerStyle = {
  marginTop: "40px",
};

interface IUpdateCategoryDTO {
  name: string;
  description: string;
  image: string;
}

const ShowCategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const navigate = useNavigate();

  const updateItemInDb = (
    item: IUpdateCategoryDTO
  ): Promise<AxiosResponse<IUpdateCategoryDTO>> => {
    return http.put("api/categories/update/" + categoryId, item);
  };

  const initialValues: IUpdateCategoryDTO = {
    name: "",
    description: "",
    image: "",
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

  const onSubmitHandler = async (values: IUpdateCategoryDTO) => {
    try {
      console.log("values", values);

      const response = await updateItemInDb(values);

      navigate("/categories");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
    //enableReinitialize: true,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  useEffect(() => {
    http
      .get("api/categories/" + categoryId)
      .then((response) => {
        console.log("data", response.data);

        setFieldValue("name", response.data.name);
        setFieldValue("description", response.data.description);
        setFieldValue("image", response.data.image);
      })
      .catch((error) => console.log(error));
  }, []);

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
                  Enter new name here
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder={values?.name}
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Enter new description here
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="userDescription"
                  type="text"
                  placeholder={values?.description}
                  name="description"
                />
              </div>
              <div className="mb-4">
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
                    <img
                      src={
                        values.image?.startsWith("data:image")
                          ? values.image
                          : "http://localhost:8082/api/home/files/300_" +
                            values.image
                      }
                    />
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default ShowCategoryPage;
