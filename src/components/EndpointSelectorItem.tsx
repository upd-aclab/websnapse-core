import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSetAtom, type PrimitiveAtom } from "jotai";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import type Synapse from "~/types/Synapse";

interface Props {
  index: number;
  neuron: Neuron;
  synapseAtom: PrimitiveAtom<Synapse>;
  choosingFrom: boolean;
}

const EndpointSelectorItem = ({
  index,
  neuron,
  synapseAtom,
  choosingFrom,
}: Props) => {
  const { label, id } = neuron;
  const setSynapse = useSetAtom(synapseAtom);

  return (
    <div className="flex">
      {index > 0 && <DropdownMenu.Separator className="w-[1px] bg-lilac" />}
      <DropdownMenu.Item
        className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
        onClick={() => {
          setSynapse((previousSynapse) => ({
            ...previousSynapse,
            from: choosingFrom ? id : previousSynapse.from,
            to: choosingFrom ? previousSynapse.to : id,
          }));
        }}
      >
        <InlineMath math={`${label}`} />
      </DropdownMenu.Item>
    </div>
  );
};

export default EndpointSelectorItem;
