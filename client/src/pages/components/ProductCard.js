import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const fullImageUrl = product.productImagePath;
  return (
    <div className="bg-white shadow-md p-10 -mt-10 rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Link href={product.slug}>
        <Image
          src={fullImageUrl}
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
