import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { type Dispatch, type SetStateAction } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";

interface Props {
  neurons: Neuron[];
  setSelectedNeuron: Dispatch<SetStateAction<number>>;
  setSelectedRule: Dispatch<SetStateAction<number>>;
}

const NeuronSelector = ({
  neurons,
  setSelectedNeuron,
  setSelectedRule,
}: Props) => {
  return (
    <div className="w-full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="h-8 w-full rounded-md border border-solid border-lilac px-3 text-start">
          Choose a neuron to edit...
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {neurons.map(({ id, label }, index) => (
              <>
                {index > 0 && (
                  <DropdownMenu.Separator className="w-[1px] bg-lilac" />
                )}
                <DropdownMenu.Item
                  key={index}
                  className="select-none px-2 py-1 outline-0 hover:cursor-pointer hover:bg-lilac hover:text-white"
                  onClick={() => {
                    setSelectedNeuron(id);
                    setSelectedRule(0);
                  }}
                >
                  <InlineMath math={`${label}`} />
                </DropdownMenu.Item>
              </>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default NeuronSelector;
