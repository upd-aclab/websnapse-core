import { type Dispatch, type SetStateAction } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import type System from "~/types/System";

interface Props {
  neuron: Neuron;
  selectedNeuron: number;
  setSystem: Dispatch<SetStateAction<System>>;
}

const NeuronBuilder = ({ neuron, selectedNeuron, setSystem }: Props) => {
  const setLabel = (label: string) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        label: neuron.id === selectedNeuron ? label : neuron.label,
      })),
    }));
  };

  const setSpikes = (spikes: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        spikes: neuron.id === selectedNeuron ? spikes : neuron.spikes,
      })),
    }));
  };

  const { label, spikes } = neuron;

  return neuron ? (
    <div className="flex flex-col gap-3">
      <div>
        Currently editing neuron <InlineMath math={`${label}`} />:
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Label</p>
          <input
            type="text"
            value={label}
            placeholder="n_{1}"
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Spikes</p>
          <input
            type="number"
            value={spikes}
            placeholder="0"
            min={0}
            onChange={(e) => setSpikes(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  ) : (
    <div>No neuron selected!</div>
  );
};

export default NeuronBuilder;
