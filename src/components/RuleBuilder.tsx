import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";
import type Rule from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";

interface Props {
  neuron: Neuron;
  rule: Rule;
  handlers: Handlers;
}

const RuleBuilder = ({ neuron, rule, handlers }: Props) => {
  const { regex, consumed, produced, delay } = rule;

  return (
    <div className="flex flex-col gap-3">
      <div>
        Editing rule <InlineMath math={`${getRuleString(rule)}`} /> in{" "}
        <InlineMath math={`${neuron.label}`} />:
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Regex</p>
          <input
            type="text"
            value={regex}
            placeholder="a^{2}"
            onChange={(e) => handlers.setRegex(e.target.value)}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Consumed</p>
          <input
            type="number"
            value={consumed}
            placeholder="0"
            min={1}
            onChange={(e) => {
              handlers.setConsumed(parseInt(e.target.value));
              handlers.setProduced(
                Math.min(produced, parseInt(e.target.value))
              );
            }}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Produced</p>
          <input
            type="number"
            value={produced}
            placeholder="0"
            max={consumed}
            min={0}
            onChange={(e) => handlers.setProduced(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
        <label className="flex items-center">
          <p className="w-36">Delay</p>
          <input
            type="number"
            value={delay}
            placeholder="0"
            min={0}
            onChange={(e) => handlers.setDelay(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default RuleBuilder;
