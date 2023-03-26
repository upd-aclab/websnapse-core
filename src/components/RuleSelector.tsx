import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { type Dispatch, type SetStateAction } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import getRuleString from "~/utils/getMathString";

interface Props {
  neuron?: Neuron;
  setSelectedRule: Dispatch<SetStateAction<number>>;
}

const RuleSelector = ({ neuron, setSelectedRule }: Props) => {
  return neuron ? (
    <div className="w-full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="h-8 w-full rounded-md border border-solid border-lilac px-3 text-start">
          Choose a rule in neuron <InlineMath math={`${neuron.label}`} /> to
          edit...
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex flex-col overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {neuron.rules.map((rule, index) => (
              <>
                {index > 0 && (
                  <DropdownMenu.Separator className="h-[1px] bg-lilac" />
                )}
                <DropdownMenu.Item
                  key={index}
                  className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
                  onClick={() => setSelectedRule(index)}
                >
                  <InlineMath math={`${getRuleString(rule)}`} />
                </DropdownMenu.Item>
              </>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  ) : (
    <div>No neuron selected!</div>
  );
};

export default RuleSelector;
