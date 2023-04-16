import type Rule from "./Rule";

interface Neuron {
  id: number;
  label: string;
  spikes: number;
  rules: Rule[];
  downtime: number;
}

const generateNeuron = (): Neuron => ({
  id: Date.now(),
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
});

export default Neuron;
export { generateNeuron };
