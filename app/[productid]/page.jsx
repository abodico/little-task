"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Page = (props) => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios(
        `https://www.api.setalkel.co/product/?cat=${props.params.productid}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex p-4 justify-evenly w-screen max-w-full flex-wrap gap-8 box-border ">
      {products.map((item, index) => {
        const img = item.hidden
          ? " "
          : `https://www.api.setalkel.co${item.img}`;
        return (
          <div
            className=" shadow-lg rounded-lg px-2 py-4 w-[calc((100%-96px)/4)] text-center "
            key={index}
          >
            {/* card-img */}
            <div
              style={{ backgroundImage: `url(${img})` }}
              className={`rounded-2xl bg-contain bg-no-repeat bg-center w-full h-auto min-h-[180px] `}
            ></div>
            {/* text-info */}
            <div className="">
              <h3 className="font-semibold">{item.subCat.en}</h3>
              <p className="text-neutral-500 text-sm">
                Weight: {item.peiceQty.usualWeight}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
