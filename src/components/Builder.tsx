import { useAtomValue } from "jotai";
import { neuronAtomsAtom, synapseAtomsAtom } from "~/atoms/primitives";
import NeuronBuilder from "./NeuronBuilder";
import SynapseBuilder from "./SynapseBuilder";

const Builder = () => {
  const neuronAtoms = useAtomValue(neuronAtomsAtom);
  const synapseAtoms = useAtomValue(synapseAtomsAtom);

  return (
    <section className="text-sm w-full">
      <div>
        <div className="flex flex-col gap-3 p-5">
          {neuronAtoms.map((neuronAtom, index) => (
            <NeuronBuilder key={index} neuronAtom={neuronAtom} />
          ))}
        </div>
        <div className="flex flex-col gap-3 p-5">
          {synapseAtoms.map((synapseAtom, index) => (
            <SynapseBuilder key={index} synapseAtom={synapseAtom} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Builder;
