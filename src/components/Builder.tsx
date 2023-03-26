import { useState, type Dispatch, type SetStateAction } from "react";
import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";
import RuleSelector from "./RuleSelector";

interface Props {
  system: System;
  setSystem: Dispatch<SetStateAction<System>>;
}

const Builder = ({ system, setSystem }: Props) => {
  const [selectedNeuron, setSelectedNeuron] = useState(1);
  const [selectedRule, setSelectedRule] = useState(0);

  return (
    <section className="w-[40%] border-r-2 border-solid border-lilac px-5">
      <h1 className="mt-5 mb-3 text-3xl font-bold">Builder</h1>
      <div className="flex flex-col gap-5">
        <NeuronSelector
          neurons={system.neurons}
          setSelectedNeuron={setSelectedNeuron}
        />
        <NeuronBuilder
          neuron={
            system.neurons.find((neuron) => neuron.id === selectedNeuron)!
          }
          selectedNeuron={selectedNeuron}
          setSystem={setSystem}
        />
        <RuleSelector
          neuron={system.neurons.find((neuron) => neuron.id === selectedNeuron)}
          setSelectedRule={setSelectedRule}
        />
        <RuleBuilder
          neuron={
            system.neurons.find((neuron) => neuron.id === selectedNeuron)!
          }
          selectedNeuron={selectedNeuron}
          selectedRule={selectedRule}
          setSystem={setSystem}
        />
      </div>
    </section>
  );
};

export default Builder;
