import { useAtomValue, type PrimitiveAtom } from "jotai";
import { InlineMath } from "react-katex";
import Xarrow, { useXarrow } from "react-xarrows";
import { highlightSelectedAtom } from "~/atoms/primitives";
import type SynapseType from "~/types/Synapse";

interface Props {
  synapseAtom: PrimitiveAtom<SynapseType>;
}

const Synapse = ({ synapseAtom }: Props) => {
  const { from, to, weight, selected } = useAtomValue(synapseAtom);
  const highlightSelected = useAtomValue(highlightSelectedAtom);

  useXarrow();

  return (
    <Xarrow
      start={from.toString()}
      end={to.toString()}
      path="straight"
      color={highlightSelected && selected ? "blue" : "black"}
      strokeWidth={2}
      labels={
        <div
          className={`flex p-1 items-center justify-center rounded-full bg-white ${
            highlightSelected && selected ? "text-navyblue" : "text-black"
          }`}
        >
          <InlineMath math={`${weight}`} />
        </div>
      }
    />
  );
};

export default Synapse;
