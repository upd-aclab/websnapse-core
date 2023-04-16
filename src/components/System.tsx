import { Xwrapper } from "react-xarrows";
import Neuron from "./Neuron";
import System from "~/types/System";
import Synapse from "./Synapse";
import type Selected from "~/types/Selected";
import sameTuple from "~/utils/sameTuple";
import type Handlers from "~/types/Handlers";

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
