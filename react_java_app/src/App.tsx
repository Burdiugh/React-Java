import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import DefaultLayout from "./components/containers/default";

import AddCategory from "./components/Category/AddCategory";

import ShowCategory from "./components/Category/ShowCategory";
import ShowCategories from "./components/Category/ShowCategoriesPage";
import ShowProducts from "./components/Product/ShowProducts";
import ProductCreate from "./components/Product/CreateProduct";
import EditProduct from "./components/Product/EditProductPage";
import ShowProduct from "./components/Product/ShowProduct";
import Login from "./components/Auth/LoginPage";
import Register from "./components/Auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          <Route path="categories" element={<ShowCategories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="category" element={<ShowCategory />} />
          <Route path="products" element={<ShowProducts />} />
          <Route path="products/add" element={<ProductCreate />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="product/view/:id" element={<ShowProduct />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
