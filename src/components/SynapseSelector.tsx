import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtomValue } from "jotai";
import { InlineMath } from "react-katex";
import { synapseAtomsAtom } from "~/atoms/primitives";
import SynapseSelectorItem from "./SynapseSelectorItem";

interface Props {
  synapseString: string;
}

const SynapseSelector = ({ synapseString }: Props) => {
  const synapseAtoms = useAtomValue(synapseAtomsAtom);

  return (
    <span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="h-8 rounded-md border border-solid border-lilac mx-1 px-2 text-start">
          <InlineMath math={synapseString} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex flex-col overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {synapseAtoms.map((synapseAtom, index) => (
              <SynapseSelectorItem
                key={index}
                synapseAtom={synapseAtom}
                index={index}
              />
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default SynapseSelector;
