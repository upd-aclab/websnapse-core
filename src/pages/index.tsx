import Head from "next/head";
import System from "~/components/System";
import { useState } from "react";
import { DefaultSystem } from "~/types/System";
import { type NextPage } from "next";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";
import type Neuron from "~/types/Neuron";
import type Handlers from "~/types/Handlers";

const Home: NextPage = () => {
  const [mode, setMode] = useState(0);
  const [system, setSystem] = useState(DefaultSystem);

  const [selectedNeuron, setSelectedNeuron] = useState(1);
  const [selectedRule, setSelectedRule] = useState(0);
  const [selectedSynapse, setSelectedSynapse] = useState(0);

  const addNeuron = () => {
    const newNeuron: Neuron = {
      id: system.neurons.length + 1,
      label: String.raw`\verb|<label>|`,
      spikes: 0,
      rules: [
        {
          regex: "a",
          consumed: 1,
          produced: 1,
          delay: 0,
        },
      ],
    };
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: [...previousSystem.neurons, newNeuron],
    }));
  };

  const setLabel = (label: string) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        label: neuron.id === selectedNeuron ? label : neuron.label,
      })),
    }));
  };

  const setSpikes = (spikes: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        spikes: neuron.id === selectedNeuron ? spikes : neuron.spikes,
      })),
    }));
  };

  const setRegex = (regex: string) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          regex:
            neuron.id === selectedNeuron && index === selectedRule
              ? regex
              : rule.regex,
        })),
      })),
    }));
  };

  const setConsumed = (consumed: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          consumed:
            neuron.id === selectedNeuron && index === selectedRule
              ? consumed
              : rule.consumed,
        })),
      })),
    }));
  };

  const setProduced = (produced: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          produced:
            neuron.id === selectedNeuron && index === selectedRule
              ? produced
              : rule.produced,
        })),
      })),
    }));
  };

  const setDelay = (delay: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          delay:
            neuron.id === selectedNeuron && index === selectedRule
              ? delay
              : rule.delay,
        })),
      })),
    }));
  };

  const setFrom = (from: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        from: index === selectedSynapse ? from : synapse.from,
      })),
    }));
  };

  const setTo = (to: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        to: index === selectedSynapse ? to : synapse.to,
      })),
    }));
  };

  const setWeight = (weight: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        weight: index === selectedSynapse ? weight : synapse.weight,
      })),
    }));
  };

  const handlers: Handlers = {
    setSelectedNeuron,
    setSelectedRule,
    setSelectedSynapse,
    addNeuron,
    setLabel,
    setSpikes,
    setRegex,
    setConsumed,
    setProduced,
    setDelay,
		setFrom,
		setTo,
		setWeight,
  };

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
              handlers={handlers}
              selectedNeuron={selectedNeuron}
              selectedRule={selectedRule}
              selectedSynapse={selectedSynapse}
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
