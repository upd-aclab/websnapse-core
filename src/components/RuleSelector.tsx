import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";
import getRuleString from "~/utils/getMathString";

interface Props {
  neuron: Neuron;
  handlers: Handlers;
}

const RuleSelector = ({ neuron, handlers }: Props) => {
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
              <div key={index}>
                {index > 0 && (
                  <DropdownMenu.Separator className="h-[1px] bg-lilac" />
                )}
                <DropdownMenu.Item
                  className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
                  onClick={() => handlers.setSelectedRule(index)}
                >
                  <InlineMath math={`${getRuleString(rule)}`} />
                </DropdownMenu.Item>
              </div>
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
