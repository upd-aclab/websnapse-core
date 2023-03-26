interface Neuron {
  id: number;
  spikes: number;
  label: string;
  regex: string;
  consumed: number;
  produced: number;
  delay: number;
}

export default Neuron;
