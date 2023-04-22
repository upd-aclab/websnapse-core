import { useAtomValue } from "jotai";
import { Xwrapper } from "react-xarrows";
import { neuronAtomsAtom, synapseAtomsAtom } from "~/atoms/primitives";
import Neuron from "./Neuron";
import Synapse from "./Synapse";

const System = () => {
  const neuronAtoms = useAtomValue(neuronAtomsAtom);
  const synapseAtoms = useAtomValue(synapseAtomsAtom);

  return (
    <section className="relative h-auto w-full p-10">
      <Xwrapper>
        {neuronAtoms.map((neuronAtom, index) => (
          <Neuron key={index} neuronAtom={neuronAtom} />
        ))}
        {synapseAtoms.map((synapseAtom, index) => (
          <Synapse key={index} synapseAtom={synapseAtom} />
        ))}
      </Xwrapper>
    </section>
  );
};

export default System;
