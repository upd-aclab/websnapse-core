import { useAtomValue } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import { modeAtom } from "~/atoms/primitives";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";
import Simulator from "~/components/Simulator";
import SystemType from "~/components/System";

const Home: NextPage = () => {
  const mode = useAtomValue(modeAtom);
  const ModeComponents = [<Builder key={0} />, <Simulator key={1} />];

  return (
    <>
      <Head>
        <title>WebSnapse</title>
      </Head>
      <main className="flex h-screen flex-col font-display">
        <h1 className="border-b-2 border-solid border-lilac py-2 text-center text-4xl font-bold">
          <span className="text-lilac">Web</span>Snapse
          <span className="ml-2 text-2xl opacity-50">core</span>
        </h1>
        <div className="flex h-full">
          <div className="flex w-[40%]">
            {ModeComponents[mode]}
            <ModeSelector />
          </div>
          <SystemType />
        </div>
      </main>
    </>
  );
};

export default Home;
