import { InlineMath } from "react-katex";
import type RuleType from "~/types/Rule";
import getRuleString from "~/utils/getMathString";

interface Props {
  data: RuleType;
}

const Rule = ({ data }: Props) => {
  return <InlineMath math={`${getRuleString(data)}`} />;
};

export default Rule;
