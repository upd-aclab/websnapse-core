import Head from "next/head";
import System from "~/components/System";
import { useState } from "react";
import { DefaultSystem } from "~/types/System";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const [system, setSystem] = useState(DefaultSystem);

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
        <System system={system} setSystem={setSystem} />
      </main>
    </>
  );
};

export default Home;
