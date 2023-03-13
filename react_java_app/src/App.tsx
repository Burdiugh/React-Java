import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import DefaultLayout from "./components/containers/default";

import AddCategory from "./components/Category/AddCategory";

import ShowCategory from "./components/Category/ShowCategory";
import ShowCategories from "./components/Category/ShowCategoriesPage";
import ShowProducts from "./components/Product/ShowProducts";
import ProductCreate from "./components/Product/CreateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="categories" element={<ShowCategories />} />
          <Route path="products" element={<ShowProducts />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="products/add" element={<ProductCreate />} />
          <Route path="category" element={<ShowCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
