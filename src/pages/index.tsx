import { type NextPage } from "next";
import Head from "next/head";
import Graph from "~/components/Graph";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WebSnapse</title>
      </Head>
      <main className="font-display">
        <h1 className="py-2 text-center text-4xl font-bold">
          <span className="text-lilac">Web</span>Snapse
          <span className="ml-2 text-2xl opacity-50">core</span>
        </h1>
        <Graph />
      </main>
    </>
  );
};

export default Home;
