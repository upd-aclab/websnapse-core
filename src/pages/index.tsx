import Head from "next/head";
import System from "~/components/System";
import { useState } from "react";
import { DefaultSystem } from "~/types/System";
import { type NextPage } from "next";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";
import type Neuron from "~/types/Neuron";
import type Handlers from "~/types/Handlers";
import type Selected from "~/types/Selected";

const Home: NextPage = () => {
  const [mode, setMode] = useState(0);
  const [system, setSystem] = useState(DefaultSystem);
  const [selected, setSelected] = useState<Selected>({
    neuron: 1,
    rule: 0,
    synapse: 0,
  });

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
        label: neuron.id === selected.neuron ? label : neuron.label,
      })),
    }));
  };

  const setSpikes = (spikes: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        spikes: neuron.id === selected.neuron ? spikes : neuron.spikes,
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
            neuron.id === selected.neuron && index === selected.rule
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
            neuron.id === selected.neuron && index === selected.rule
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
            neuron.id === selected.neuron && index === selected.rule
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
            neuron.id === selected.neuron && index === selected.rule
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
        from: index === selected.synapse ? from : synapse.from,
      })),
    }));
  };

  const setTo = (to: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        to: index === selected.synapse ? to : synapse.to,
      })),
    }));
  };

  const setWeight = (weight: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        weight: index === selected.synapse ? weight : synapse.weight,
      })),
    }));
  };

  const setNeuron = (id: number) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      neuron: id,
    }));
  };

  const setRule = (index: number) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      rule: index,
    }));
  };

  const setSynapse = (index: number) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      synapse: index,
    }));
  };

  const handlers: Handlers = {
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
    setNeuron,
    setRule,
    setSynapse,
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
            <Builder system={system} handlers={handlers} selected={selected} />
            <ModeSelector mode={mode} setMode={setMode} />
          </div>
          <System system={system} selected={selected} />
        </div>
      </main>
    </>
  );
};

export default Home;
