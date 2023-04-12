import type Rule from "./Rule";

interface Neuron {
  id: number;
  label: string;
  spikes: number;
  rules: Rule[];
  downtime: number;
}

export default Neuron;
