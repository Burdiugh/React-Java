import { useEffect } from "react";

import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";

import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../types";
import * as Yup from "yup";
import axios from "axios";
import setAuthToken from "../../../helpers/setAuthToken";
import http_common from "../../../http_common";

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const navigate = useNavigate();

  const onSubmitLogin = (values: ILogin) => {
    console.log("login values:", values);

    http_common
      .post("api/account/login", values)
      .then((data) => {
        var token = data.data.token;
        if (token) {
          console.log("token", token);
          // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          setAuthToken(token);

          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((errors) => {
        console.log("Register errors", errors);
      });
  };

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmitLogin,
    enableReinitialize: true,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  useEffect(() => {
    window.scrollTo(50, document.body.scrollHeight);
  }, []);

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
              <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div className="px-5 py-7">
                  <label
                    htmlFor="email"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    E-mail
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <ErrorMessage name="email" />

                  <label
                    htmlFor="password"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <ErrorMessage name="password" />
                  <button
                    type="submit"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <h4>Don't you have an account?</h4>
                    </div>
                    <div>
                      <Link
                        to={"/register"}
                        type="button"
                        className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-center sm:text-left whitespace-nowrap">
                      <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 inline-block align-text-top"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="inline-block ml-1">
                          Forgot Password
                        </span>
                      </button>
                    </div>
                    <div className="flex justify-center text-center sm:text-right whitespace-nowrap">
                      <button className=" flex border border-blue-200 transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        <Link to={"/"} className="inline-block ml-1">
                          Home Page
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default LoginPage;
