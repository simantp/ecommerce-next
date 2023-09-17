import Link from "next/link";
//import { useEffect } from "react";
import { useState, useEffect } from "react";
//import ProductSwiper from "./ProductSwiper";
//import styles from "./styles.module.scss";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function ProductCard({ product }) {
  // const [active, setActive] = useState(0);
  // const [images, setImages] = useState(product.subProducts[active]?.images);
  // const [prices, setPrices] = useState(
  //   product.subProducts[active]?.sizes
  //     .map((s) => {
  //       return s.price;
  //     })
  //     .sort((a, b) => {
  //       return a - b;
  //     })
  // );
  // const [styless, setStyless] = useState(
  //   product.subProducts.map((p) => {
  //     return p.color;
  //   })
  // );
  // useEffect(() => {
  //   setImages(product.subProducts[active].images);
  //   setPrices(
  //     product.subProducts[active]?.sizes
  //       .map((s) => {
  //         return s.price;
  //       })
  //       .sort((a, b) => {
  //         return a - b;
  //       })
  //   );
  // }, [active, product]);

  return (
    <div className="bg-white shadow-md p-10 -mt-10 rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Link href={product.slug}>
        <Image
          src={product.featuredImage}
          alt="Product"
          className="object-cover rounded-t-xl"
          width={288}
          height={320}
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black  block capitalize">
            {product.name}
          </p>
        </div>
      </Link>
    </div>
  );
}
