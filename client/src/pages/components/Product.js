import Image from "next/image";
import Link from "next/link";

function Product({ id, title, price, image }) {
  return (
    <Link
      href={`/product/${id}`}
      class="relative flex flex-col justify-between m-5 bg-white rounded z-30"
    >
      <Image
        src={image}
        width={200}
        height={200}
        alt="Product Image"
        class="mx-auto mt-4"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-center">{title}</div>
      </div>
    </Link>
  );
}

export default Product;
