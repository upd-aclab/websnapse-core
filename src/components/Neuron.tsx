import Draggable, {
  type DraggableData,
  type DraggableEvent,
} from "react-draggable";
import { useRef } from "react";
import { InlineMath } from "react-katex";
import { useXarrow } from "react-xarrows";
import type NeuronType from "~/types/Neuron";
import Rule from "./Rule";
import sameTuple from "~/utils/sameTuple";
import type Handlers from "~/types/Handlers";

interface Props {
  data: NeuronType;
  selected: boolean;
  handlers: Handlers;
  selectedRule: [number, number];
}

const Neuron = ({ data, selected, handlers, selectedRule }: Props) => {
  const updateXArrow = useXarrow();
  const nodeRef = useRef(null);

  const { id, spikes, label, position, rules, downtime } = data;

  const onControlledDrag = (_: DraggableEvent, position: DraggableData) => {
    handlers.setPosition(id, position);
  };

  return (
    <Draggable
      position={position}
      onDrag={(e, position) => {
        updateXArrow();
        onControlledDrag(e, position);
      }}
      onStop={updateXArrow}
      nodeRef={nodeRef}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        id={id.toString()}
        className={`${
          selected ? "text-blue-500 border-blue-500" : "text-black border-black"
        } flex w-fit items-center justify-center rounded-md border-2 border-solid bg-white px-3 py-1 hover:cursor-move`}
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
              selected={sameTuple([id, index], selectedRule)}
            />
          ))}
          <InlineMath math={`${downtime}`} />
        </div>
      </div>
    </Draggable>
  );
};

export default Neuron;
