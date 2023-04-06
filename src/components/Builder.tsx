import { useState, type Dispatch, type SetStateAction } from "react";
import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";
import RuleSelector from "./RuleSelector";
import SynapseBuilder from "./SynapseBuilder";
import SynapseSelector from "./SynapseSelector";

interface Props {
  system: System;
  setSystem: Dispatch<SetStateAction<System>>;
}

const Builder = ({ system, setSystem }: Props) => {
  const [selectedNeuron, setSelectedNeuron] = useState(1);
  const [selectedRule, setSelectedRule] = useState(0);
  const [selectedSynapse, setSelectedSynapse] = useState(0);

  return (
    <section className="w-[40%] border-r-2 border-solid border-lilac text-sm">
      <h1 className="px-5 pt-3 text-3xl font-bold">Builder</h1>
      <div>
        <div className="flex flex-col gap-3 p-5">
          <NeuronSelector
            neurons={system.neurons}
            setSelectedNeuron={setSelectedNeuron}
            setSelectedRule={setSelectedRule}
          />
          <NeuronBuilder
            neuron={
              system.neurons.find((neuron) => neuron.id === selectedNeuron)!
            }
            selectedNeuron={selectedNeuron}
            setSystem={setSystem}
          />
        </div>
        <div className="flex flex-col gap-3 border-y-2 border-dashed border-lilac p-5">
          <RuleSelector
            neuron={system.neurons.find(
              (neuron) => neuron.id === selectedNeuron
            )}
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
        <div className="flex flex-col gap-3 p-5">
          <SynapseSelector
            synapses={system.synapses}
            setSelectedSynapse={setSelectedSynapse}
          />
          <SynapseBuilder
            system={system}
            selectedSynapse={selectedSynapse}
            setSystem={setSystem}
          />
        </div>
      </div>
    </section>
  );
};

export default Builder;
