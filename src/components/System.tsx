import { Xwrapper } from "react-xarrows";
import type Handlers from "~/types/Handlers";
import type Selected from "~/types/Selected";
import System from "~/types/System";
import sameTuple from "~/utils/sameTuple";
import Neuron from "./Neuron";
import Synapse from "./Synapse";

interface Props {
  handlers: Handlers;
  system: System;
  selected: Selected;
}

const System = ({ handlers, system, selected }: Props) => {
  const neuronsJSX = system.neurons.map((neuron, index) => (
    <Neuron
      key={index}
      data={neuron}
      selected={neuron.id === selected.neuron}
      handlers={handlers}
      selectedRule={selected.rule}
    />
  ));

  const synapsesJSX = system.synapses.map((synapse, index) => (
    <Synapse
      key={index}
      data={synapse}
      selected={sameTuple([synapse.from, synapse.to], selected.synapse)}
    />
  ));

  return (
    <section className="relative h-auto w-full p-10">
      <Xwrapper>
        {neuronsJSX}
        {synapsesJSX}
      </Xwrapper>
    </section>
  );
};

export default System;
