import Head from "next/head";
import HomeFeaturedProducts from "./components/HomeFeaturedProducts";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Ecommerce</title>
      </Head>

      <main className="layout">
        <HomeFeaturedProducts />
      </main>
    </div>
  );
}
