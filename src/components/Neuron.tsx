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

  const { id, spikes, label, regex, consumed, produced, delay } = data;

  const consumption = `${consumed > 1 ? `a^{${consumed}}` : "a"}`;
  const production = `${produced > 1 ? `a^{${produced}}` : "a"}`;
  const ruleString = `${regex}/${consumption} \\rightarrow ${production}; ${delay}`;

  return (
    <Draggable onDrag={updateXArrow} onStop={updateXArrow} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        id={`${id}`}
        className="relative flex w-fit items-center justify-center rounded-md border-2 border-solid border-black bg-white px-3 py-1 text-black hover:cursor-move"
      >
        <span className="absolute -left-6 -top-6">
          <InlineMath math={`${label}`} />
        </span>
        <div className="flex flex-col items-center">
          <InlineMath math={`${spikes}`} />
          <InlineMath math={`${ruleString}`} />
        </div>
      </div>
    </Draggable>
  );
};

export default Neuron;
