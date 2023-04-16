import { type DraggableData } from "react-draggable";

interface Handlers {
  addNeuron: () => number;
  deleteNeuron: () => void;
  addRule: () => void;
  deleteRule: () => number;
  setLabel: (label: string) => void;
  setSpikes: (spikes: number) => void;
  setPosition: (id: number, position: DraggableData) => void;
  setRegex: (regex: string) => void;
  setConsumed: (consumed: number) => void;
  setProduced: (produced: number) => void;
  setDelay: (delay: number) => void;
  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setWeight: (weight: number) => void;
  setNeuron: (id: number) => void;
  setRule: (id: [number, number]) => void;
  setSynapse: (id: [number, number]) => void;
}

export default Handlers;
