import type Rule from "./Rule";

interface Neuron {
  id: number;
  spikes: number;
  label: string;
  rules: Rule[];
}

export default Neuron;
