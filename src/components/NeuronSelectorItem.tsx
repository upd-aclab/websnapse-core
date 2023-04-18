import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { atom, useAtom, useSetAtom, type PrimitiveAtom } from "jotai";
import { useMemo } from "react";
import { InlineMath } from "react-katex";
import { neuronsAtom } from "~/atoms/primitives";
import type Neuron from "~/types/Neuron";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
  index: number;
}

const NeuronSelectorItem = ({ neuronAtom, index }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);

  const resetSelectedNeuronAtom = useMemo(
    () =>
      atom(null, (get, set) =>
        set(
          neuronsAtom,
          get(neuronsAtom).map((neuron) => ({
            ...neuron,
            selected: false,
          }))
        )
      ),
    []
  );
  const resetSelectedNeuron = useSetAtom(resetSelectedNeuronAtom);

  return (
    <div className="flex">
      {index > 0 && <DropdownMenu.Separator className="w-[1px] bg-lilac" />}
      <DropdownMenu.Item
        className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
        onClick={() => {
          resetSelectedNeuron();
          setNeuron((previousNeuron) => ({
            ...previousNeuron,
            selected: true,
          }));
        }}
      >
        <InlineMath math={`${neuron.label}`} />
      </DropdownMenu.Item>
    </div>
  );
};

export default NeuronSelectorItem;
