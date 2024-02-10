/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
const Page = () => {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await axios("https://www.api.setalkel.co/product/cat/");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-evenly w-screen p-4 max-w-full flex-wrap gap-8 box-border relative">
      {categories.map((item, index) => {
        const img = `https://www.api.setalkel.co${item.img}`;
        return (
          <Link
            href={`/${item._id}`}
            className=" shadow-lg rounded-lg px-2 py-4 max-w-[calc((100%-96px)/4)] text-center w-[207px]"
            key={index}
          >
            {/* card-img */}
            <div
              style={{ backgroundImage: `url(${img})` }}
              className={`rounded-2xl bg-contain bg-no-repeat bg-center w-full h-auto min-h-[180px] `}
            ></div>
            {/* text-info */}
            <div className="">
              <h3 className="font-semibold">{item.en}</h3>
              <p className="text-neutral-500">contain: {item.count}Product</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
