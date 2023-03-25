import { type NextPage } from "next";
import Head from "next/head";
import Graph from "~/components/Graph";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WebSnapse</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Auto</span>mata
        </h1>
        <h2 className="mb-5 text-3xl text-white">Empowering theory.</h2>
        <Graph />
      </main>
    </>
  );
};

export default Home;
