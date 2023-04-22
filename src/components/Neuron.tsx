import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai";
import { useRef } from "react";
import Draggable, {
  type DraggableData,
  type DraggableEvent,
} from "react-draggable";
import { InlineMath } from "react-katex";
import { highlightSelectedAtom } from "~/atoms/primitives";
import type NeuronType from "~/types/Neuron";
import Rule from "./Rule";

interface Props {
  neuronAtom: PrimitiveAtom<NeuronType>;
}

const Neuron = ({ neuronAtom }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);
  const highlightSelected = useAtomValue(highlightSelectedAtom);
  const nodeRef = useRef(null);

  const { id, spikes, label, position, rules, downtime, selected } = neuron;

  const onControlledDrag = (_: DraggableEvent, newPosition: DraggableData) => {
    setNeuron((previousNeuron) => ({
      ...previousNeuron,
      position: {
        x: newPosition.x,
        y: newPosition.y,
      },
    }));
  };

  return (
    <Draggable
      position={position}
      onDrag={(e, newPosition) => {
        onControlledDrag(e, newPosition);
      }}
      nodeRef={nodeRef}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        id={id.toString()}
        className={`${
          highlightSelected && selected
            ? "text-navyblue border-navyblue"
            : "text-black border-black"
        } flex w-fit items-center justify-center rounded-md border-2 border-solid bg-white px-3 py-1 hover:cursor-move`}
      >
        <span className="absolute -left-6 -top-6">
          <InlineMath math={`${label}`} />
        </span>
        <div className="flex flex-col items-center">
          <InlineMath math={`${spikes}`} />
          {rules.map((rule, index) => (
            <Rule key={index} rule={rule} />
          ))}
          <InlineMath math={`${downtime}`} />
        </div>
      </div>
    </Draggable>
  );
};

export default Neuron;
