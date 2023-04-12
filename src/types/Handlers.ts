interface Handlers {
  addNeuron: () => void;
  setLabel: (label: string) => void;
  setSpikes: (spikes: number) => void;
  setRegex: (regex: string) => void;
  setConsumed: (consumed: number) => void;
  setProduced: (produced: number) => void;
  setDelay: (delay: number) => void;
  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setWeight: (weight: number) => void;
  setNeuron: (id: number) => void;
  setRule: (id: number) => void;
  setSynapse: (id: number) => void;
}

export default Handlers;
