import Draggable from "react-draggable";
import { useRef } from "react";
import { InlineMath } from "react-katex";
import { useXarrow } from "react-xarrows";
import type NeuronType from "~/types/Neuron";
import Rule from "./Rule";

interface Props {
  data: NeuronType;
}

const Neuron = ({ data }: Props) => {
  const updateXArrow = useXarrow();
  const nodeRef = useRef(null);

  const { id, spikes, label, rules } = data;

  return (
    <Draggable
      onDrag={updateXArrow}
      onStop={updateXArrow}
      nodeRef={nodeRef}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        id={`${id}`}
        className="absolute top-[100px] left-[100px] flex w-fit items-center justify-center rounded-md border-2 border-solid border-black bg-white px-3 py-1 text-black hover:cursor-move"
      >
        <span className="absolute -left-6 -top-6">
          <InlineMath math={`${label}`} />
        </span>
        <div className="flex flex-col items-center">
          <InlineMath math={`${spikes}`} />
          {rules.map((rule, index) => (
            <Rule key={index} data={rule} />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default Neuron;
