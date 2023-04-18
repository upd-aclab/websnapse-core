import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtomValue } from "jotai";
import { InlineMath } from "react-katex";
import { neuronAtomsAtom } from "~/atoms/primitives";
import NeuronSelectorItem from "./NeuronSelectorItem";

interface Props {
  label: string;
}

const NeuronSelector = ({ label }: Props) => {
  const neuronAtoms = useAtomValue(neuronAtomsAtom);

  return (
    <span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="h-8 rounded-md border border-solid border-lilac mx-1 px-2">
          <InlineMath math={`${label}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {neuronAtoms.map((neuronAtom, index) => (
              <NeuronSelectorItem
                key={index}
                neuronAtom={neuronAtom}
                index={index}
              />
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default NeuronSelector;
