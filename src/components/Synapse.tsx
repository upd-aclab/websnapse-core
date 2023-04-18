import { useAtomValue, type PrimitiveAtom } from "jotai";
import { InlineMath } from "react-katex";
import Xarrow from "react-xarrows";
import type SynapseType from "~/types/Synapse";

interface Props {
  synapseAtom: PrimitiveAtom<SynapseType>;
}

const Synapse = ({ synapseAtom }: Props) => {
  const { from, to, weight, selected } = useAtomValue(synapseAtom);

  return (
    <Xarrow
      start={from.toString()}
      end={to.toString()}
      path="straight"
      color={selected ? "lightblue" : "lightgray"}
      labels={
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <InlineMath math={`${weight}`} />
        </div>
      }
    />
  );
};

export default Synapse;
