import axios from "axios";
import exp from "constants";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import EclipseWidget from "../../Common/Eclipse";
import ModalDelete from "../../Common/Modal/delete";
import { IProductItem } from "../types";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const ShowProductsPage = () => {
  const [data, setData] = useState<IProductItem[]>([]);

  const [load, setLoad] = useState(false);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8082/api/products/${id}`)
      .then((response) => {
        // do something with the response, like updating state or triggering a re-render
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get("http://localhost:8082/api/products")
      .then((response) => {
        setData(response.data);
        setTimeout(() => {
          setLoad(false);
        }, 5000);
      })
      .catch((error) => console.log(error));
  }, []);

  const content = data.map((item) => (
    <div key={item.id} className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <Link
          //style={LinkStyle}
          to={`/product?productId=${item.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none "
        >
          <img
            src={"http://localhost:8082/api/home/files/600_" + item.files}
            alt="image"
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      <div className="flex ">
        <div className="flex-auto w-64">
          <h3 className="mt-6 text-sm text-gray-500">{item.description}..</h3>
          <p className="text-base font-semibold text-gray-900">{item.name}</p>
          <p className="text-base font-semibold text-gray-900">
            {item.category}
          </p>
        </div>
        <ModalDelete
          id={item.id}
          deleteFunc={handleDelete}
          title="Removing product"
          text={`Are you sure about removing product called '${item.name}'`}
        ></ModalDelete>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container mx-auto">
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {load && <EclipseWidget></EclipseWidget>}
    </>
  );
};

export default ShowProductsPage;
