import type Rule from "~/types/Rule";

const getRuleString = (rule: Rule) => {
  const { regex, consumed, produced, delay } = rule;

  const consumption = `${consumed !== 1 ? `a^{${consumed}}` : "a"}`;
  const production = `${
    produced > 1 ? `a^{${produced}}` : `${produced === 1 ? "a" : "\\lambda"}`
  }`;
  const ruleString = `${regex}/${consumption} \\rightarrow ${production}; ${delay}`;

  return ruleString;
};

export default getRuleString;
