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
      label: "n_0",
      regex: "a",
      consumed: 2,
      produced: 1,
      delay: 0,
    },
  ],
  synapses: [],
  inputNeuron: 1,
  outputNeuron: 1,
};

export default System;
export { DefaultSystem };
