import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";

interface Props {
  neurons: Neuron[];
  label: string;
  handlers: Handlers;
}

const NeuronSelector = ({ neurons, label, handlers }: Props) => {
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
            {neurons.map(({ id, label }, index) => (
              <div key={index} className="flex">
                {index > 0 && (
                  <DropdownMenu.Separator className="w-[1px] bg-lilac" />
                )}
                <DropdownMenu.Item
                  className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
                  onClick={() => {
                    handlers.setNeuron(id);
                    handlers.setRule(0);
                  }}
                >
                  <InlineMath math={`${label}`} />
                </DropdownMenu.Item>
              </div>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default NeuronSelector;
