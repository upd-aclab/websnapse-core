import { type Dispatch, type SetStateAction } from "react";

interface Handlers {
  setSelectedNeuron: Dispatch<SetStateAction<number>>;
  setSelectedRule: Dispatch<SetStateAction<number>>;
  setSelectedSynapse: Dispatch<SetStateAction<number>>;
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
}

export default Handlers;
