import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Xwrapper, useXarrow } from "react-xarrows";
import {
  neuronAtomsAtom,
  synapseAtomsAtom,
  systemAtom,
} from "~/atoms/primitives";
import Neuron from "./Neuron";
import Synapse from "./Synapse";

const System = () => {
  const system = useAtomValue(systemAtom);
  const neuronAtoms = useAtomValue(neuronAtomsAtom);
  const synapseAtoms = useAtomValue(synapseAtomsAtom);
  const updateArrow = useXarrow();

  useEffect(() => {
    updateArrow();
  }, [system, updateArrow]);

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
