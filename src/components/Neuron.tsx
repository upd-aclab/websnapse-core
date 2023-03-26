import Draggable from "react-draggable";
import { useRef } from "react";
import { InlineMath } from "react-katex";
import { useXarrow } from "react-xarrows";
import type NeuronType from "~/types/Neuron";

interface Props {
  data: NeuronType;
}

const Neuron = ({ data }: Props) => {
  const updateXArrow = useXarrow();
  const nodeRef = useRef(null);

  const consumption = `${data.consumed > 1 ? `a^${data.consumed}` : "a"}`;
  const production = `${data.produced > 1 ? `a^${data.produced}` : "a"}`;
  const ruleString = `${data.regex}/${production} \\rightarrow ${consumption}; ${data.delay}`;

  return (
    <Draggable onDrag={updateXArrow} onStop={updateXArrow} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        id={data.id.toString()}
        className="relative flex w-fit items-center justify-center rounded-md border-2 border-solid border-black bg-white px-3 py-1 text-black hover:cursor-move"
      >
        <span className="absolute -left-6 -top-6">
          <InlineMath math={`${data.label}`} />
        </span>
        <InlineMath math={`${ruleString}`} />
      </div>
    </Draggable>
  );
};

export default Neuron;
