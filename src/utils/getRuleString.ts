import type Rule from "~/types/Rule";

const getRuleString = (rule: Rule) => {
  const { regex, consumed, produced, delay } = rule;

  const getToken = (amount: number): string =>
    amount > 1 ? `a^{${amount}}` : `${amount === 1 ? "a" : "\\lambda"}`;

  const ruleString = `${regex}/${getToken(consumed)} \\rightarrow ${getToken(
    produced
  )}; ${delay}`;

  return ruleString;
};

export default getRuleString;
