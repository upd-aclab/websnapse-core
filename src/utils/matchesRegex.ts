import type Neuron from "~/types/Neuron";

const matchesRegex = (neuron: Neuron, ruleIndex: number): boolean => {
  const rule = neuron.rules[ruleIndex];
  if (rule) {
    const purifiedRegex = rule.regex
      .replace(/\s*\\cup\s*/g, "|")
      .replace(/\^\{?\s*\*\s*\}?/g, "*")
      .replace(/\^\{?\s*\+\s*\}?/g, "+")
      .replace(/\^\{?(\d+)\}?/g, "{$1}");
    const re = new RegExp(`/${purifiedRegex}/g`);
    return re.test("a".repeat(neuron.spikes));
  } else {
    return false;
  }
};

export default matchesRegex;
