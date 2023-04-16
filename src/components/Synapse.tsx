import { InlineMath } from "react-katex";
import Xarrow from "react-xarrows";
import type SynapseType from "~/types/Synapse";

interface Props {
  data: SynapseType;
  selected: boolean;
}

const Synapse = ({ data, selected }: Props) => {
  const { from, to, weight } = data;

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
