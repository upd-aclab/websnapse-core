import { useAtom, useAtomValue, useSetAtom, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { useMemo } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { nudgeNeuronsAtom, resetSelectedNeuronAtom } from "~/atoms/actions";
import { neuronsAtom } from "~/atoms/primitives";
import type Neuron from "~/types/Neuron";
import { generateNeuron } from "~/types/Neuron";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
}

const NeuronBuilder = ({ neuronAtom }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);
  const { label, spikes, selected } = neuron;

  const setNeurons = useSetAtom(neuronsAtom);
  const resetSelectedNeuron = useSetAtom(resetSelectedNeuronAtom);
  const nudgeNeurons = useSetAtom(nudgeNeuronsAtom);

  const rulesAtom = useMemo(
    () => focusAtom(neuronAtom, (optic) => optic.prop("rules")),
    [neuronAtom]
  );
  const ruleAtomsAtom = splitAtom(rulesAtom);
  const ruleAtoms = useAtomValue(ruleAtomsAtom);

  const labelOk = label.length > 0;
  const spikesOk = spikes >= 0 && !isNaN(spikes);

  return (
    <div className={`p-6 ${selected ? "visible" : "hidden"}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div>
            Editing neuron <NeuronSelector label={label} />
          </div>
          <div
            className="h-6 w-6 ml-auto hoverable rounded-full flex justify-center items-center text-xl"
            onClick={() => {
              resetSelectedNeuron();
              setNeurons((previousNeurons) => [
                ...previousNeurons,
                generateNeuron(),
              ]);
              nudgeNeurons();
            }}
          >
            <AiOutlinePlus />
          </div>
          <div
            className="h-6 w-6 ml-2 hoverable rounded-full flex justify-center items-center text-xl"
            onClick={() => {
              // handlers.deleteNeuron();
              // const newNeuronReference = neurons.find(
              //   (neuron) => neuron.id !== id
              // )!;
              // handlers.setNeuron(newNeuronReference.id);
              // handlers.setRule([newNeuronReference.id, 0]);
              // const newSynapseReference = synapses.find(
              //   ({ from, to }) => from !== id && to !== id
              // )!;
              // if (synapse.from === id || synapse.to === id) {
              //   handlers.setSynapse([
              //     newSynapseReference.from,
              //     newSynapseReference.to,
              //   ]);
              // }
            }}
          >
            <AiOutlineMinus />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center">
            <p className="w-36">Label</p>
            <input
              type="text"
              value={label}
              placeholder="n_{1}"
              onChange={(e) => {
                setNeuron((previousNeuron) => ({
                  ...previousNeuron,
                  label: e.target.value,
                }));
              }}
              className={`w-full rounded-md border-2 border-solid px-3 py-1 ${
                labelOk ? "border-green-600" : "border-red-600"
              }`}
            />
          </label>
          <label className="flex items-center">
            <p className="w-36">Spikes</p>
            <input
              type="number"
              value={spikes}
              placeholder="0"
              min={0}
              onChange={(e) =>
                setNeuron((previousNeuron) => ({
                  ...previousNeuron,
                  spikes: parseInt(e.target.value),
                }))
              }
              className={`w-full rounded-md border-2 border-solid px-3 py-1 ${
                spikesOk ? "border-green-600" : "border-red-600"
              }`}
            />
          </label>
        </div>
      </div>
      <div className="border-t-2 border-dashed border-lilac pt-6 mt-6">
        {ruleAtoms.map((ruleAtom, index) => (
          <RuleBuilder
            key={index}
            neuronAtom={neuronAtom}
            ruleAtom={ruleAtom}
          />
        ))}
      </div>
    </div>
  );
};

export default NeuronBuilder;
