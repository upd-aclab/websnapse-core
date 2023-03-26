import { type Dispatch, type SetStateAction } from "react";
import { InlineMath } from "react-katex";
import type System from "~/types/System";

interface Props {
  system: System;
  selectedSynapse: number;
  setSystem: Dispatch<SetStateAction<System>>;
}

const SynapseBuilder = ({ system, selectedSynapse, setSystem }: Props) => {
  const setFrom = (from: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        from: index === selectedSynapse ? from : synapse.from,
      })),
    }));
  };

  const setTo = (to: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        to: index === selectedSynapse ? to : synapse.to,
      })),
    }));
  };

  const setWeight = (weight: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      synapses: previousSystem.synapses.map((synapse, index) => ({
        ...synapse,
        weight: index === selectedSynapse ? weight : synapse.weight,
      })),
    }));
  };

  const { from, to, weight } = system.synapses[selectedSynapse]!;

  const fromLabel = system.neurons.find((neuron) => neuron.id === from)!.label;
  const toLabel = system.neurons.find((neuron) => neuron.id === to)!.label;

  return (
    <div className="flex flex-col gap-3">
      <div>
        Currently editing synapse{" "}
        <InlineMath math={`${fromLabel} \\rightarrow ${toLabel}`} />:
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">From</p>
          <input
            disabled
            type="number"
            value={from}
            placeholder="0"
            min={0}
            onChange={(e) => setFrom(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1 hover:cursor-not-allowed"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">To</p>
          <input
            disabled
            type="number"
            value={to}
            placeholder="0"
            min={0}
            onChange={(e) => setTo(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1 hover:cursor-not-allowed"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Weight</p>
          <input
            type="number"
            value={weight}
            placeholder="0"
            min={0}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default SynapseBuilder;
