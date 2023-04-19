import { InlineMath } from "react-katex";
import type RuleType from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";

interface Props {
  rule: RuleType;
}

const Rule = ({ rule }: Props) => {
  return (
    <span className={`${rule.selected ? "text-[#1c00ff]" : "text-black"}`}>
      <InlineMath math={`${getRuleString(rule)}`} />
    </span>
  );
};

export default Rule;
