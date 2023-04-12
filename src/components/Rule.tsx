import { InlineMath } from "react-katex";
import type RuleType from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";

interface Props {
  data: RuleType;
  selected: boolean;
}

const Rule = ({ data, selected }: Props) => {
  return (
    <span className={`${selected ? "text-blue-500" : "text-black"}`}>
      <InlineMath math={`${getRuleString(data)}`} />
    </span>
  );
};

export default Rule;
