import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http_common";
import EclipseWidget from "../../Common/Eclipse";
import ModalDelete from "../../Common/Modal/delete";

export interface ICategory {
  id: number;
  name: string;
  image: string;
  description: string;
}

const LinkStyle = {
  textDecoration: "none",
  border: "none",
};
const ContainerStyle = {
  marginTop: "40px",
};

const ShowCategoriesPage = () => {
  const [data, setData] = useState<ICategory[]>([]);

  const [load, setLoad] = useState(false);

  const handleDelete = (id: number | string | undefined) => {
    http
      .delete(`api/categories/${id}`)
      .then((response) => {
        setData(data.filter((x) => x.id !== id));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoad(true);
    http
      .get("api/categories")
      .then((response) => {
        setData(response.data);
        setTimeout(() => {
          setLoad(false);
        }, 500);
      })
      .catch((error) => console.log(error));
  }, []);

  const content = data.map((item) => (
    <div key={item.id} className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <Link
          //style={LinkStyle}
          to={`/category?categoryId=${item.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none "
        >
          <img
            src={"http://localhost:8082/api/home/files/600_" + item.image}
            alt="image"
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      <div className="flex">
        <div className="flex-auto w-64">
          <h3 className="mt-6 text-sm text-gray-500">{item.description}..</h3>
          <p className="text-base font-semibold text-gray-900">{item.name}</p>
        </div>
        <ModalDelete
          id={item.id}
          deleteFunc={handleDelete}
          title="Removing category"
          text={`Are you sure about removing product called '${item.name}'`}
        ></ModalDelete>
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {content}
            </div>
          </div>
        </div>
      </div>

      {load && <EclipseWidget></EclipseWidget>}
    </>
  );
};

export default ShowCategoriesPage;
