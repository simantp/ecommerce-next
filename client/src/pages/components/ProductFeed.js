import Link from "next/link";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.map(({ _id, name, price, description, category, image }) => (
        <Link href={`/product/${_id}`} key={_id}>
          <Product
            id={_id}
            name={name}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        </Link>
      ))}
    </div>
  );
}

export default ProductFeed;
