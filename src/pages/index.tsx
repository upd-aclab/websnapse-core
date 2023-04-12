import Head from "next/head";
import System from "~/components/System";
import { useEffect, useState } from "react";
import { DefaultSystem } from "~/types/System";
import { type NextPage } from "next";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";
import type Neuron from "~/types/Neuron";
import type Handlers from "~/types/Handlers";
import type Selected from "~/types/Selected";
import matchesRegex from "~/utils/matchesRegex";
import Simulator from "~/components/Simulator";

const Home: NextPage = () => {
  const [mode, setMode] = useState(0);
  const [system, setSystem] = useState(DefaultSystem);
  const [selected, setSelected] = useState<Selected>({
    neuron: 1,
    rule: 0,
    synapse: 0,
  });
  const [time, setTime] = useState(0);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (simulating) {
      const intervalId = setInterval(
        () => setTime((previousTime) => previousTime + 1),
        1000
      );
      return () => clearInterval(intervalId);
    }
  }, [simulating]);

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
      downtime: 0,
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

  const simulate = () => {
    setSystem((previousSystem) => {
      const copy = previousSystem;

      const n = copy.neurons.length;

      const willFire = Array(n)
        .fill(0)
        .map(() => Array<number>(0));

      copy.neurons.forEach((neuron, neuronIndex) =>
        neuron.rules.forEach((_, ruleIndex) => {
          if (matchesRegex(neuron, ruleIndex)) {
            willFire[neuronIndex]?.push(ruleIndex);
          }
        })
      );

      return copy;
    });
  };

  const toggleSimulating = () => {
    setSimulating((previousSimulating) => !previousSimulating);
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

  const ModeComponents = [
    <Builder key={0} system={system} handlers={handlers} selected={selected} />,
    <Simulator
      key={1}
      system={system}
      time={time}
      toggleSimulating={toggleSimulating}
    />,
  ];

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
            <ModeSelector mode={mode} setMode={setMode} />
          </div>
          <System system={system} selected={selected} />
        </div>
      </main>
    </>
  );
};

export default Home;
