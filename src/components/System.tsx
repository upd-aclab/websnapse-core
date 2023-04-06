import { Xwrapper } from "react-xarrows";
import Neuron from "./Neuron";
import System from "~/types/System";
import Synapse from "./Synapse";

interface Props {
  system: System;
  selectedNeuron: number;
  selectedRule: number;
  selectedSynapse: number;
}

const System = ({
  system,
  selectedNeuron,
  selectedRule,
  selectedSynapse,
}: Props) => {
  const neuronsJSX = system.neurons.map((neuron, index) => (
    <Neuron
      key={index}
      data={neuron}
      index={index}
      selected={neuron.id === selectedNeuron}
			selectedRule={selectedRule}
    />
  ));

  const synapsesJSX = system.synapses.map((synapse, index) => (
    <Synapse key={index} data={synapse} />
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
