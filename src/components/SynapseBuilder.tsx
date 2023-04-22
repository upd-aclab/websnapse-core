import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai";
import { neuronsAtom } from "~/atoms/primitives";
import type Synapse from "~/types/Synapse";
import SynapseSelector from "./SynapseSelector";

interface Props {
  synapseAtom: PrimitiveAtom<Synapse>;
}

const SynapseBuilder = ({ synapseAtom }: Props) => {
  const [synapse, setSynapse] = useAtom(synapseAtom);
  const { from, to, weight, selected } = synapse;

  const neurons = useAtomValue(neuronsAtom);
  const fromLabel = neurons.find((neuron) => neuron.id === from)!.label;
  const toLabel = neurons.find((neuron) => neuron.id === to)!.label;
  const synapseString = `${fromLabel} \\rightarrow ${toLabel}`;

  const weightOk = weight >= 1 && !isNaN(weight);

  return (
    <div
      className={`p-6 border-solid border-y-2 border-lilac flex flex-col gap-3 ${
        selected ? "visible" : "hidden"
      }`}
    >
      <div>
        Editing synapse <SynapseSelector synapseString={synapseString} />
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
            onChange={(e) =>
              setSynapse((previousSynapse) => ({
                ...previousSynapse,
                from: parseInt(e.target.value),
              }))
            }
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
            onChange={(e) =>
              setSynapse((previousSynapse) => ({
                ...previousSynapse,
                to: parseInt(e.target.value),
              }))
            }
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
            onChange={(e) =>
              setSynapse((previousSynapse) => ({
                ...previousSynapse,
                weight: parseInt(e.target.value),
              }))
            }
            className={`w-full rounded-md border-2 border-solid px-3 py-1 ${
              weightOk ? "border-green-600" : "border-red-600"
            }`}
          />
        </label>
      </div>
    </div>
  );
};

export default SynapseBuilder;
