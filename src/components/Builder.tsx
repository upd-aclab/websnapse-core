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
  selectedNeuron: number;
  selectedRule: number;
  selectedSynapse: number;
  setSelectedNeuron: Dispatch<SetStateAction<number>>;
  setSelectedRule: Dispatch<SetStateAction<number>>;
  setSelectedSynapse: Dispatch<SetStateAction<number>>;
}

const Builder = ({
  system,
  setSystem,
  selectedNeuron,
  selectedRule,
  selectedSynapse,
  setSelectedNeuron,
  setSelectedRule,
  setSelectedSynapse,
}: Props) => {
  return (
    <section className="text-sm">
      <div>
        <div className="flex flex-col gap-3 p-5">
          <NeuronSelector
            neurons={system.neurons}
            setSelectedNeuron={setSelectedNeuron}
            setSelectedRule={setSelectedRule}
            setSystem={setSystem}
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
