import type Rule from "./Rule";

interface Neuron {
  id: number;
  label: string;
  position: {
    x: number;
    y: number;
  };
  spikes: number;
  rules: Rule[];
  downtime: number;
  selected?: boolean;
}

const generateNeuron = (): Neuron => ({
  id: Date.now(),
  label: String.raw`\verb|<label>|`,
  position: {
    x: 0,
    y: 0,
  },
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
  selected: false,
});

export default Neuron;
export { generateNeuron };
