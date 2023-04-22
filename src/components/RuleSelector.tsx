import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtomValue, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { useMemo } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import RuleSelectorItem from "./RuleSelectorItem";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
  ruleString: string;
}

const RuleSelector = ({ neuronAtom, ruleString }: Props) => {
  const rulesAtom = useMemo(
    () => focusAtom(neuronAtom, (optic) => optic.prop("rules")),
    [neuronAtom]
  );
  const ruleAtomsAtom = splitAtom(rulesAtom);
  const ruleAtoms = useAtomValue(ruleAtomsAtom);

  return (
    <span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="h-8 rounded-md border border-solid border-lilac mx-1 px-2 text-start">
          <InlineMath math={`${ruleString}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex flex-col items-center overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {ruleAtoms.map((ruleAtom, index) => (
              <RuleSelectorItem
                key={index}
                neuronAtom={neuronAtom}
                ruleAtom={ruleAtom}
                index={index}
              />
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default RuleSelector;
