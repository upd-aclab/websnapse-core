import { Xwrapper } from "react-xarrows";
import Neuron from "./Neuron";
import System from "~/types/System";
import Synapse from "./Synapse";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  system: System;
  setSystem: Dispatch<SetStateAction<System>>;
}

const System = ({ system }: Props) => {
  const neuronsJSX = system.neurons.map((neuron, index) => (
    <Neuron key={index} data={neuron} index={index} />
  ));

  const synapsesJSX = system.synapses.map((synapse, index) => (
    <Synapse key={index} data={synapse} />
  ));

  return (
    <div className="relative h-[80vh] w-full border border-solid border-black p-10">
      <Xwrapper>
        {neuronsJSX}
        {synapsesJSX}
      </Xwrapper>
    </div>
  );
};

export default System;
