import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  neuronAtomsAtom,
  neuronsAtom,
  synapseAtomsAtom,
  synapsesAtom,
  systemAtom,
} from "~/atoms/primitives";
import { resetSelectedNeuronAtom } from "~/atoms/resetters";
import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import SynapseBuilder from "./SynapseBuilder";

const Builder = () => {
  const [system, setSystem] = useAtom(systemAtom);
  const neuronAtoms = useAtomValue(neuronAtomsAtom);
  const synapseAtoms = useAtomValue(synapseAtomsAtom);

  const resetSelectedNeuron = useSetAtom(resetSelectedNeuronAtom);
  const setNeurons = useSetAtom(neuronsAtom);
  const setSynapses = useSetAtom(synapsesAtom);

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (
          e.target &&
          e.target.result &&
          typeof e.target.result === "string"
        ) {
          setSystem(JSON.parse(e.target.result) as System);
          resetSelectedNeuron();
          setNeurons((previousNeurons) =>
            previousNeurons.map((neuron, neuronIndex) => ({
              ...neuron,
              rules: neuron.rules.map((rule, ruleIndex) => ({
                ...rule,
                selected: neuronIndex === 0 && ruleIndex === 0,
              })),
              selected: neuronIndex === 0,
            }))
          );
          setSynapses((previousSynapses) =>
            previousSynapses.map((synapse, index) => ({
              ...synapse,
              selected: index === 0,
            }))
          );
        }
      };
      reader.readAsText(file, "utf-8");
    }
  }, [file, setSystem, resetSelectedNeuron, setNeurons, setSynapses]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className="text-sm w-full">
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
      <input type="file" accept=".json" onChange={handleFileChange} />
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(system, null, 2)
        )}`}
        download={`download.json`}
      >
        Download
      </a>
    </section>
  );
};

export default Builder;
