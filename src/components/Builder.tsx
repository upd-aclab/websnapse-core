import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import NeuronSelector from "./NeuronSelector";
import RuleBuilder from "./RuleBuilder";
import RuleSelector from "./RuleSelector";
import SynapseBuilder from "./SynapseBuilder";
import SynapseSelector from "./SynapseSelector";
import type Handlers from "~/types/Handlers";
import type Selected from "~/types/Selected";

interface Props {
  system: System;
  handlers: Handlers;
  selected: Selected;
}

const Builder = ({ system, handlers, selected }: Props) => {
  const neuron = system.neurons.find(
    (neuron) => neuron.id === selected.neuron
  )!;

  const rule = neuron.rules[selected.rule]!;

  const synapse = system.synapses[selected.synapse]!;

  const fromLabel = system.neurons.find(
    (neuron) => neuron.id === synapse.from
  )!.label;

  const toLabel = system.neurons.find(
    (neuron) => neuron.id === synapse.to
  )!.label;

  return (
    <section className="text-sm">
      <div>
        <div className="flex flex-col gap-3 p-5">
          <NeuronBuilder
            neurons={system.neurons}
            neuron={neuron}
            handlers={handlers}
          />
        </div>
        <div className="flex flex-col gap-3 border-y-2 border-dashed border-lilac p-5">
          <RuleBuilder neuron={neuron} rule={rule} handlers={handlers} />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <SynapseSelector synapses={system.synapses} handlers={handlers} />
          <SynapseBuilder
            synapse={synapse}
            fromLabel={fromLabel}
            toLabel={toLabel}
            handlers={handlers}
          />
        </div>
      </div>
    </section>
  );
};

export default Builder;
