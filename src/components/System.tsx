import { Xwrapper } from "react-xarrows";
import Neuron from "./Neuron";
import System from "~/types/System";
import Synapse from "./Synapse";
import type Selected from "~/types/Selected";

interface Props {
  system: System;
  selected: Selected;
}

const System = ({ system, selected }: Props) => {
  const neuronsJSX = system.neurons.map((neuron, index) => (
    <Neuron
      key={index}
      data={neuron}
      index={index}
      selected={neuron.id === selected.neuron}
      selectedRule={selected.rule}
    />
  ));

  const synapsesJSX = system.synapses.map((synapse, index) => (
    <Synapse key={index} data={synapse} selected={index === selected.synapse} />
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
