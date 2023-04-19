import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtom, useSetAtom, type PrimitiveAtom } from "jotai";
import { InlineMath } from "react-katex";
import { resetSelectedNeuronAtom } from "~/atoms/resetters";
import type Neuron from "~/types/Neuron";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
  index: number;
}

const NeuronSelectorItem = ({ neuronAtom, index }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);
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
            rules: previousNeuron.rules.map((rule, index) => ({
              ...rule,
              selected: index === 0,
            })),
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
