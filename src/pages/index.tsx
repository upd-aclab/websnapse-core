import Head from "next/head";
import System from "~/components/System";
import { useEffect, useState } from "react";
import { defaultSystem } from "~/types/System";
import { type NextPage } from "next";
import Builder from "~/components/Builder";
import ModeSelector from "~/components/ModeSelector";
import type Handlers from "~/types/Handlers";
import matchesRegex from "~/utils/matchesRegex";
import Simulator from "~/components/Simulator";
import { generateNeuron } from "~/types/Neuron";
import { defaultRule } from "~/types/Rule";
import { defaultSelected } from "~/types/Selected";
import sameTuple from "~/utils/sameTuple";
import { type DraggableData } from "react-draggable";

const Home: NextPage = () => {
  const [mode, setMode] = useState(0);

  const [system, setSystem] = useState(defaultSystem);
  const [selected, setSelected] = useState(defaultSelected);

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

  const addNeuron = (): number => {
    const newNeuron = generateNeuron();
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: [...previousSystem.neurons, newNeuron],
    }));
    return newNeuron.id;
  };

  const deleteNeuron = () => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.filter(
        (neuron) => neuron.id !== selected.neuron
      ),
      synapses: previousSystem.synapses.filter(
        ({ from, to }) => from !== selected.neuron && to !== selected.neuron
      ),
    }));
  };

  const addRule = () => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules:
          neuron.id === selected.neuron
            ? [...neuron.rules, defaultRule]
            : neuron.rules,
      })),
    }));
  };

  const deleteRule = () => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.filter(
          (_, ruleIndex) => !sameTuple([neuron.id, ruleIndex], selected.rule)
        ),
      })),
    }));
    return selected.rule[1];
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

  const setPosition = (id: number, position: DraggableData) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        position: neuron.id === id ? position : neuron.position,
      })),
    }));
  };

  const setRegex = (regex: string) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, ruleIndex) => ({
          ...rule,
          regex: sameTuple([neuron.id, ruleIndex], selected.rule)
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
        rules: neuron.rules.map((rule, ruleIndex) => ({
          ...rule,
          consumed: sameTuple([neuron.id, ruleIndex], selected.rule)
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
        rules: neuron.rules.map((rule, ruleIndex) => ({
          ...rule,
          produced: sameTuple([neuron.id, ruleIndex], selected.rule)
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
        rules: neuron.rules.map((rule, ruleIndex) => ({
          ...rule,
          delay: sameTuple([neuron.id, ruleIndex], selected.rule)
            ? delay
            : rule.delay,
        })),
      })),
    }));
  };

  const setFrom = (from: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse) => ({
        ...synapse,
        from: sameTuple([synapse.from, synapse.to], selected.synapse)
          ? from
          : synapse.from,
      })),
    }));
  };

  const setTo = (to: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse) => ({
        ...synapse,
        to: sameTuple([synapse.from, synapse.to], selected.synapse)
          ? to
          : synapse.to,
      })),
    }));
  };

  const setWeight = (weight: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse) => ({
        ...synapse,
        weight: sameTuple([synapse.from, synapse.to], selected.synapse)
          ? weight
          : synapse.weight,
      })),
    }));
  };

  const setNeuron = (id: number) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      neuron: id,
    }));
  };

  const setRule = (id: [number, number]) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      rule: id,
    }));
  };

  const setSynapse = (id: [number, number]) => {
    setSelected((previousSelected) => ({
      ...previousSelected,
      synapse: id,
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
    deleteNeuron,
    addRule,
    deleteRule,
    setLabel,
    setSpikes,
    setPosition,
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
          <System handlers={handlers} system={system} selected={selected} />
        </div>
      </main>
    </>
  );
};

export default Home;
