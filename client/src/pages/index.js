import ProductCard from "./components/ProductCard";
import Banner from "./components/Banner";
import Head from "next/head";

export default function Home({ productData }) {
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
          <ProductCard productData={productData} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3005/products");
  const productData = await res.json();
  return {
    props: {
      productData,
    },
  };
}
