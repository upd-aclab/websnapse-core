import type Neuron from "./Neuron";
import type Synapse from "./Synapse";

interface System {
  neurons: Neuron[];
  synapses: Synapse[];
  inputNeuron: number;
  outputNeuron: number;
}

export default System;
