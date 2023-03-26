import { InlineMath } from "react-katex";
import type RuleType from "~/types/Rule";

interface Props {
  data: RuleType;
}

const Rule = ({ data }: Props) => {
  const { regex, consumed, produced, delay } = data;

  const consumption = `${consumed > 1 ? `a^{${consumed}}` : "a"}`;
  const production = `${produced > 1 ? `a^{${produced}}` : "a"}`;
  const ruleString = `${regex}/${consumption} \\rightarrow ${production}; ${delay}`;

  return <InlineMath math={`${ruleString}`} />;
};

export default Rule;
