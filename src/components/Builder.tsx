import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";
import RuleSelector from "./RuleSelector";
import SynapseBuilder from "./SynapseBuilder";
import SynapseSelector from "./SynapseSelector";
import type Handlers from "~/types/Handlers";

interface Props {
  system: System;
  handlers: Handlers;
  selectedNeuron: number;
  selectedRule: number;
  selectedSynapse: number;
}

const Builder = ({
  system,
  handlers,
  selectedNeuron,
  selectedRule,
  selectedSynapse,
}: Props) => {
  const neuron = system.neurons.find((neuron) => neuron.id === selectedNeuron)!;

  return (
    <section className="text-sm">
      <div>
        <div className="flex flex-col gap-3 p-5">
          <NeuronSelector neurons={system.neurons} handlers={handlers} />
          <NeuronBuilder neuron={neuron} handlers={handlers} />
        </div>
        <div className="flex flex-col gap-3 border-y-2 border-dashed border-lilac p-5">
          <RuleSelector neuron={neuron} handlers={handlers} />
          <RuleBuilder
            neuron={neuron}
            handlers={handlers}
            selectedNeuron={selectedNeuron}
            selectedRule={selectedRule}
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <SynapseSelector synapses={system.synapses} handlers={handlers} />
          <SynapseBuilder
            system={system}
            selectedSynapse={selectedSynapse}
            handlers={handlers}
          />
        </div>
      </div>
    </section>
  );
};

export default Builder;
