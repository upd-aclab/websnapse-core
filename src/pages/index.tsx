import Head from "next/head";
import System from "~/components/System";
import { useState } from "react";
import { DefaultSystem } from "~/types/System";
import { type NextPage } from "next";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";

const Home: NextPage = () => {
  const [mode, setMode] = useState(0);
  const [system, setSystem] = useState(DefaultSystem);

  const [selectedNeuron, setSelectedNeuron] = useState(1);
  const [selectedRule, setSelectedRule] = useState(0);
  const [selectedSynapse, setSelectedSynapse] = useState(0);

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
            <Builder
              system={system}
              setSystem={setSystem}
              selectedNeuron={selectedNeuron}
              selectedRule={selectedRule}
              selectedSynapse={selectedSynapse}
              setSelectedNeuron={setSelectedNeuron}
              setSelectedRule={setSelectedRule}
              setSelectedSynapse={setSelectedSynapse}
            />
            <ModeSelector mode={mode} setMode={setMode} />
          </div>
          <System
            system={system}
            selectedNeuron={selectedNeuron}
            selectedRule={selectedRule}
            selectedSynapse={selectedSynapse}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
