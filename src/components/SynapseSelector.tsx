import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";
import type Synapse from "~/types/Synapse";

interface Props {
  neurons: Neuron[];
  synapses: Synapse[];
  synapseString: string;
  handlers: Handlers;
}

const SynapseSelector = ({
  neurons,
  synapses,
  synapseString,
  handlers,
}: Props) => {
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
            {synapses.map(({ from, to }, index) => {
              const fromLabel = neurons.find(
                (neuron) => neuron.id === from
              )!.label;
              const toLabel = neurons.find((neuron) => neuron.id === to)!.label;
              return (
                <div key={index}>
                  {index > 0 && (
                    <DropdownMenu.Separator className="h-[1px] bg-lilac" />
                  )}
                  <DropdownMenu.Item
                    className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
                    onClick={() => handlers.setSynapse(index)}
                  >
                    <InlineMath math={`${fromLabel} \\rightarrow ${toLabel}`} />
                  </DropdownMenu.Item>
                </div>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default SynapseSelector;
