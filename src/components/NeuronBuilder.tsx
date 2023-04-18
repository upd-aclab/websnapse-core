import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import type Neuron from "~/types/Neuron";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
}

const NeuronBuilder = ({ neuronAtom }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);
  const { label, spikes, selected } = neuron;

  const rulesAtom = focusAtom(neuronAtom, (optic) => optic.prop("rules"));
  const ruleAtomsAtom = splitAtom(rulesAtom);
  const ruleAtoms = useAtomValue(ruleAtomsAtom);

  return (
    <div className={`${selected ? "visible" : "hidden"}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div>
            Editing neuron <NeuronSelector label={label} />
          </div>
          <div
            className="h-6 w-6 border ml-auto border-solid border-lilac rounded-full hover:cursor-pointer hover:bg-lilac hover:text-white flex justify-center items-center text-xl"
            onClick={() => {
              // const newId = handlers.addNeuron();
              // handlers.setNeuron(newId);
              // handlers.setRule([newId, 0]);
            }}
          >
            <AiOutlinePlus />
          </div>
          <div
            className="h-6 w-6 border ml-2 border-solid border-lilac rounded-full hover:cursor-pointer hover:bg-lilac hover:text-white flex justify-center items-center text-xl"
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
              onChange={(e) =>
                setNeuron((previousNeuron) => ({
                  ...previousNeuron,
                  spikes: parseInt(e.target.value),
                }))
              }
              className="w-full rounded-md border border-solid border-lilac px-3 py-1"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-y-2 border-dashed border-lilac py-10 mt-10">
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
