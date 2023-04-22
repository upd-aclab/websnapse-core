import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtomValue, type PrimitiveAtom } from "jotai";
import { InlineMath } from "react-katex";
import { neuronsAtom, synapsesAtom } from "~/atoms/primitives";
import type Synapse from "~/types/Synapse";
import EndpointSelectorItem from "./EndpointSelectorItem";

interface Props {
  synapseAtom: PrimitiveAtom<Synapse>;
  label: string;
  choosingFrom: boolean;
}

const EndpointSelector = ({ synapseAtom, label, choosingFrom }: Props) => {
  const neurons = useAtomValue(neuronsAtom);
  const { from, to } = useAtomValue(synapseAtom);
  const synapses = useAtomValue(synapsesAtom);

  const existing = new Set();
  synapses.forEach(({ from: f, to: t }) => {
    if (choosingFrom && t === to) {
      existing.add(f);
    }
    if (!choosingFrom && f === from) {
      existing.add(t);
    }
  });

  if (choosingFrom) {
    existing.add(to);
  } else {
    existing.add(from);
  }

  return (
    <div className="w-full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="w-full text-left h-8 rounded-md border border-solid border-lilac px-3 py-1">
          <InlineMath math={`${label}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="flex overflow-hidden rounded-md border border-solid border-lilac bg-white"
          >
            <DropdownMenu.Arrow className="fill-lilac" />
            {neurons
              .filter((neuron) => !existing.has(neuron.id))
              .map((neuron, index) => (
                <EndpointSelectorItem
                  key={index}
                  index={index}
                  neuron={neuron}
                  synapseAtom={synapseAtom}
                  choosingFrom={choosingFrom}
                />
              ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default EndpointSelector;
