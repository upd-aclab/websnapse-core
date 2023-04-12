import type Handlers from "~/types/Handlers";
import type Synapse from "~/types/Synapse";
import SynapseSelector from "./SynapseSelector";
import type Neuron from "~/types/Neuron";

interface Props {
  neurons: Neuron[];
  synapses: Synapse[];
  synapse: Synapse;
  fromLabel: string;
  toLabel: string;
  handlers: Handlers;
}

const SynapseBuilder = ({
  neurons,
  synapses,
  synapse,
  fromLabel,
  toLabel,
  handlers,
}: Props) => {
  const { from, to, weight } = synapse;

  return (
    <div className="flex flex-col gap-3">
      <div>
        Editing synapse{" "}
        <SynapseSelector
          neurons={neurons}
          synapses={synapses}
          synapseString={`${fromLabel} \\rightarrow ${toLabel}`}
          handlers={handlers}
        />
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
            onChange={(e) => handlers.setFrom(parseInt(e.target.value))}
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
            onChange={(e) => handlers.setTo(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1 hover:cursor-not-allowed"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Weight</p>
          <input
            type="number"
            value={weight}
            placeholder="0"
            min={1}
            onChange={(e) => handlers.setWeight(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default SynapseBuilder;
