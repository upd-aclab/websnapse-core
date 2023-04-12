import Draggable from "react-draggable";
import { useRef } from "react";
import { InlineMath } from "react-katex";
import { useXarrow } from "react-xarrows";
import type NeuronType from "~/types/Neuron";
import Rule from "./Rule";

interface Props {
  data: NeuronType;
  index: number;
  selected: boolean;
  selectedRule: number;
}

const Neuron = ({ data, index, selected, selectedRule }: Props) => {
  const updateXArrow = useXarrow();
  const nodeRef = useRef(null);

  const { id, spikes, label, rules, downtime } = data;

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
        className={`${
          selected ? "text-blue-500 border-blue-500" : "text-black border-black"
        } flex w-fit items-center justify-center rounded-md border-2 border-solid bg-white px-3 py-1 hover:cursor-move`}
        style={{
          position: "absolute",
          top: 200 * (Math.floor(index / 2) + 1),
          left: 300 * ((index % 2) + 1),
        }}
      >
        <span className="absolute -left-6 -top-6">
          <InlineMath math={`${label}`} />
        </span>
        <div className="flex flex-col items-center">
          <InlineMath math={`${spikes}`} />
          {rules.map((rule, index) => (
            <Rule
              key={index}
              data={rule}
              selected={selected && selectedRule === index}
            />
          ))}
					<InlineMath math={`${downtime}`} />
        </div>
      </div>
    </Draggable>
  );
};

export default Neuron;
