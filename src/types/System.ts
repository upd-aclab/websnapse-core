import type Neuron from "./Neuron";
import type Synapse from "./Synapse";
import type Terminal from "./Terminal";

interface System {
  neurons: Neuron[];
  synapses: Synapse[];
  inputNeurons: Terminal[];
  outputNeurons: Terminal[];
}

const defaultSystem: System = {
  neurons: [
    {
      id: 1,
      spikes: 0,
      label: "n_{1}",
      position: {
        x: 0,
        y: 0,
      },
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
        {
          regex: "a^{2}",
          consumed: 1,
          produced: 1,
          delay: 1,
        },
      ],
      downtime: 0,
    },
    {
      id: 2,
      spikes: 0,
      label: "n_{2}",
      position: {
        x: 300,
        y: 0,
      },
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
      downtime: 0,
    },
    {
      id: 3,
      spikes: 0,
      label: "n_{3}",
      position: {
        x: 0,
        y: 300,
      },
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
      downtime: 0,
    },
    {
      id: 4,
      spikes: 0,
      label: "n_{4}",
      position: { x: 300, y: 300 },
      rules: [
        {
          regex: "a",
          consumed: 2,
          produced: 1,
          delay: 0,
        },
      ],
      downtime: 0,
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
  inputNeurons: [
    {
      id: 1,
      spikeTimes: [1],
    },
  ],
  outputNeurons: [
    {
      id: 4,
      spikeTimes: [],
    },
  ],
};

export default System;
export { defaultSystem };
