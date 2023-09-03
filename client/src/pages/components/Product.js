import Image from "next/image";
import Link from "next/link";

function Product({ id, title, image }) {
  return (
    <Link
      href={`/product/${id}`}
      className="relative flex flex-col justify-between m-5 bg-white rounded z-30"
    >
      <Image
        src={image}
        width={200}
        height={200}
        alt="Product Image"
        className="mx-auto mt-4"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{title}</div>
      </div>
    </Link>
  );
}

export default Product;
