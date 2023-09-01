import Head from "next/head";
import ProductFeed from "./components/ProductFeed";
import Banner from "./components/Banner";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>My Ecommerce</title>
      </Head>

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
