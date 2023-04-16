import type System from "~/types/System";
import NeuronBuilder from "./NeuronBuilder";
import RuleBuilder from "./RuleBuilder";
import SynapseBuilder from "./SynapseBuilder";
import type Handlers from "~/types/Handlers";
import type Selected from "~/types/Selected";
import sameTuple from "~/utils/sameTuple";

interface Props {
  system: System;
  handlers: Handlers;
  selected: Selected;
}

const Builder = ({ system, handlers, selected }: Props) => {
  const neuron = system.neurons.find(
    (neuron) => neuron.id === selected.neuron
  )!;

  const rule = neuron.rules[selected.rule[1]]!;

  const synapse = system.synapses.find((synapse) =>
    sameTuple([synapse.from, synapse.to], selected.synapse)
  )!;

  const fromLabel = system.neurons.find(
    (neuron) => neuron.id === synapse.from
  )!.label;

  const toLabel = system.neurons.find(
    (neuron) => neuron.id === synapse.to
  )!.label;

  return (
    <section className="text-sm w-full">
      <div>
        <div className="flex flex-col gap-3 p-5">
          <NeuronBuilder
            neurons={system.neurons}
            synapses={system.synapses}
            neuron={neuron}
            synapse={synapse}
            handlers={handlers}
          />
        </div>
        <div className="flex flex-col gap-3 border-y-2 border-dashed border-lilac p-5">
          <RuleBuilder neuron={neuron} rule={rule} handlers={handlers} />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <SynapseBuilder
            neurons={system.neurons}
            synapses={system.synapses}
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
