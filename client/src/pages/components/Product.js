import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.png";

function Product({ _id, name, image }) {
  return (
    // <Link
    //   href={`/product/${_id}`}
    //   className="relative flex flex-col justify-between m-5 bg-white rounded z-30"
    // >
    //   <Image
    //     src={logo}
    //     width={200}
    //     height={200}
    //     alt="Product Image"
    //     className="mx-auto mt-4"
    //   />
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2 text-center">{name}</div>
    //   </div>
    // </Link>
    <div className="relative flex flex-col justify-between m-5 bg-white rounded z-30">
      <Image
        src={logo}
        width={200}
        height={200}
        alt="Product Image"
        className="mx-auto mt-4"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{name}</div>
      </div>
    </div>
  );
}

export default Product;
