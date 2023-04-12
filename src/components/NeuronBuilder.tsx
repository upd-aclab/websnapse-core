import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";

interface Props {
  neuron: Neuron;
  handlers: Handlers;
}

const NeuronBuilder = ({ neuron, handlers }: Props) => {
  const { label, spikes } = neuron;

  return (
    <div className="flex flex-col gap-3">
      <div>
        Editing neuron <InlineMath math={`${label}`} />:
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Label</p>
          <input
            type="text"
            value={label}
            placeholder="n_{1}"
            onChange={(e) => handlers.setLabel(e.target.value)}
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
            onChange={(e) => handlers.setSpikes(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default NeuronBuilder;
