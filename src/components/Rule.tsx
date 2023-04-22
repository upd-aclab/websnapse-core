import { useAtomValue } from "jotai";
import { InlineMath } from "react-katex";
import { highlightSelectedAtom } from "~/atoms/primitives";
import type RuleType from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";

interface Props {
  rule: RuleType;
}

const Rule = ({ rule }: Props) => {
  const highlightSelected = useAtomValue(highlightSelectedAtom);

  return (
    <span
      className={`${
        highlightSelected && rule.selected ? "text-[#1c00ff]" : "text-black"
      }`}
    >
      <InlineMath math={`${getRuleString(rule)}`} />
    </span>
  );
};

export default Rule;
