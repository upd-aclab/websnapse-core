import Xarrow, { Xwrapper } from "react-xarrows";
import { InlineMath } from "react-katex";
import Neuron from "./Neuron";
import System from "~/types/System";

interface Props {
  system: System;
}

const System = ({ system }: Props) => {
  const neuronJSX = system.neurons.map((neuron, index) => (
    <Neuron key={index} data={neuron} />
  ));

  return (
    <div className="h-[20rem] w-full border border-solid border-black">
      <Xwrapper>
        {neuronJSX}
        <Xarrow
          start="0"
          end="1"
          path="straight"
          color="lightgray"
          labels={
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-black bg-white">
              <InlineMath math="1" />
            </div>
          }
        />
      </Xwrapper>
    </div>
  );
};

export default System;
