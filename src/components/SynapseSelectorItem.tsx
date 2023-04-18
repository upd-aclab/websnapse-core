import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
  type PrimitiveAtom,
} from "jotai";
import { useMemo } from "react";
import { InlineMath } from "react-katex";
import { neuronsAtom, synapsesAtom } from "~/atoms/primitives";
import type Synapse from "~/types/Synapse";

interface Props {
  synapseAtom: PrimitiveAtom<Synapse>;
  index: number;
}

const SynapseSelectorItem = ({ synapseAtom, index }: Props) => {
  const [synapse, setSynapse] = useAtom(synapseAtom);
  const { from, to } = synapse;

  const neurons = useAtomValue(neuronsAtom);
  const fromLabel = neurons.find((neuron) => neuron.id === from)!.label;
  const toLabel = neurons.find((neuron) => neuron.id === to)!.label;
  const synapseString = `${fromLabel} \\rightarrow ${toLabel}`;

  const resetSelectedSynapseAtom = useMemo(
    () =>
      atom(null, (get, set) =>
        set(
          synapsesAtom,
          get(synapsesAtom).map((synapse) => ({
            ...synapse,
            selected: false,
          }))
        )
      ),
    []
  );
  const resetSelectedSynapse = useSetAtom(resetSelectedSynapseAtom);

  return (
    <div key={index}>
      {index > 0 && <DropdownMenu.Separator className="h-[1px] bg-lilac" />}
      <DropdownMenu.Item
        className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
        onClick={() => {
          resetSelectedSynapse();
          setSynapse((previousSynapse) => ({
            ...previousSynapse,
            selected: true,
          }));
        }}
      >
        <InlineMath math={synapseString} />
      </DropdownMenu.Item>
    </div>
  );
};

export default SynapseSelectorItem;