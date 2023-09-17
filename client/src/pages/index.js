import ProductCard from "./components/ProductCard";
import Banner from "./components/Banner";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>My Ecommerce</title>
      </Head>

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}

        <Banner />

        {/* Product Card */}
        <div className="flex flex-wrap p-10 justify-center mt-10">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("http://localhost:3005/products").then((res) =>
    res.json()
  );
  return {
    props: {
      products,
    },
  };
}
