import { Field, FormikProvider, Form, useFormik, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import http from "../../../http_common";
import { IRegister } from "../types";

const initialValues: IRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmit = (values: IRegister) => {
    console.log("Register values: ", values);

    http
      .post("http://localhost:8082/api/account/register", values)
      .then((data) => {
        var token = data.data.token;
        if (token) {
          console.log("token", token);
          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((errors) => {
        console.log("Register errors", errors);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Surname is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    //enableReinitialize: true,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-9">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
              <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div className="px-5 py-7">
                  <label
                    htmlFor="firstName"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <ErrorMessage name="firstName" />
                  <label
                    htmlFor="lastName"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <ErrorMessage name="lastName" />
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
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  <ErrorMessage name="password" />
                  <button
                    type="submit"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Register</span>
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
                      <h4>Do you already have an account?</h4>
                    </div>
                    <div>
                      <Link
                        to={"/login"}
                        type="button"
                        className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <div className="grid grid-cols-1 gap-1">
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

export default RegisterPage;
