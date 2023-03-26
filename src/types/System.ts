import type Neuron from "./Neuron";
import type Synapse from "./Synapse";

interface System {
  neurons: Neuron[];
  synapses: Synapse[];
  inputNeuron: number;
  outputNeuron: number;
}

const DefaultSystem: System = {
  neurons: [
    {
      id: 1,
      spikes: 0,
      label: "n_{1}",
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
    },
    {
      id: 2,
      spikes: 0,
      label: "n_{2}",
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
    },
    {
      id: 3,
      spikes: 0,
      label: "n_{3}",
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
    },
    {
      id: 4,
      spikes: 0,
      label: "n_{4}",
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
    },
  ],
  synapses: [
    {
      from: 1,
      to: 2,
      weight: 1,
    },
    {
      from: 2,
      to: 3,
      weight: 1,
    },
    {
      from: 2,
      to: 4,
      weight: 1,
    },
    {
      from: 1,
      to: 3,
      weight: 2,
    },
    {
      from: 3,
      to: 4,
      weight: 1,
    },
  ],
  inputNeuron: 1,
  outputNeuron: 1,
};

export default System;
export { DefaultSystem };
