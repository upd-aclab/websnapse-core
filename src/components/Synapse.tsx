import { InlineMath } from "react-katex";
import Xarrow from "react-xarrows";
import type SynapseType from "~/types/Synapse";

interface Props {
  data: SynapseType;
}

const Synapse = ({ data }: Props) => {
  const { from, to, weight } = data;

  return (
    <Xarrow
      start={`${from}`}
      end={`${to}`}
      path="straight"
      color="lightgray"
      labels={
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <InlineMath math={`${weight}`} />
        </div>
      }
    />
  );
};

export default Synapse;
