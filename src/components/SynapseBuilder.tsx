import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { neuronsAtom, synapsesAtom } from "~/atoms/primitives";
import type Synapse from "~/types/Synapse";
import EndpointSelector from "./EndpointSelector";
import SynapseSelector from "./SynapseSelector";

interface Props {
  synapseAtom: PrimitiveAtom<Synapse>;
}

const SynapseBuilder = ({ synapseAtom }: Props) => {
  const [synapses, setSynapses] = useAtom(synapsesAtom);
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
      <div className="flex items-center">
        <div>
          Editing synapse <SynapseSelector synapseString={synapseString} />
        </div>
        <div
          className="h-6 w-6 ml-auto hoverable rounded-full flex justify-center items-center text-xl"
          onClick={() => {
            // resetSelectedRule(neuronAtom);
            // setNeuron((previousNeuron) => ({
            //   ...previousNeuron,
            //   rules: [
            //     ...previousNeuron.rules,
            //     { ...defaultRule, selected: true },
            //   ],
            // }));
            // nudgeNeurons();
          }}
        >
          <AiOutlinePlus />
        </div>
        <div
          className={`h-6 w-6 ml-2 ${
            synapses.length > 1 ? "hoverable" : "not-hoverable"
          } rounded-full flex justify-center items-center text-xl`}
          onClick={() => {
            if (synapses.length > 1) {
              setSynapses((previousSynapses) =>
                previousSynapses
                  .filter((synapse) => !synapse.selected)
                  .map((synapse, index) => ({
                    ...synapse,
                    selected: index === 0,
                  }))
              );
            }
          }}
        >
          <AiOutlineMinus />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">From</p>
          <EndpointSelector
            synapseAtom={synapseAtom}
            label={fromLabel}
            choosingFrom={true}
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">To</p>
          <EndpointSelector
            synapseAtom={synapseAtom}
            label={toLabel}
            choosingFrom={false}
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
