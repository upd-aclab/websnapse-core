import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { atom, useAtom, useSetAtom, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import type Rule from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
  ruleAtom: PrimitiveAtom<Rule>;
  index: number;
}

const RuleSelectorItem = ({ neuronAtom, ruleAtom, index }: Props) => {
  const [rule, setRule] = useAtom(ruleAtom);

  const rulesAtom = useMemo(
    () => focusAtom(neuronAtom, (optic) => optic.prop("rules")),
    [neuronAtom]
  );
  const resetSelectedRuleAtom = useMemo(
    () =>
      atom(null, (get, set) =>
        set(
          rulesAtom,
          get(rulesAtom).map((rule) => ({
            ...rule,
            selected: false,
          }))
        )
      ),
    [rulesAtom]
  );
  const resetSelectedRule = useSetAtom(resetSelectedRuleAtom);

  return (
    <div className="w-full">
      {index > 0 && <DropdownMenu.Separator className="h-[1px] bg-lilac" />}
      <DropdownMenu.Item
        className="select-none flex justify-center px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
        onClick={() => {
          resetSelectedRule();
          setRule((previousRule) => ({
            ...previousRule,
            selected: true,
          }));
        }}
      >
        <InlineMath math={`${getRuleString(rule)}`} />
      </DropdownMenu.Item>
    </div>
  );
};

export default RuleSelectorItem;
