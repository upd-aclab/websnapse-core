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
  label: String.raw`\verb|label|`,
  position: {
    x: 838,
    y: -361,
  },
  spikes: 0,
  rules: [
    {
      regex: "a",
      consumed: 1,
      produced: 1,
      delay: 0,
      selected: true,
    },
  ],
  downtime: 0,
  selected: true,
});

export default Neuron;
export { generateNeuron };
