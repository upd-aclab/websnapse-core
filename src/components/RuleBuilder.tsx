import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { InlineMath } from "react-katex";
import type Handlers from "~/types/Handlers";
import type Neuron from "~/types/Neuron";
import type Rule from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";
import RuleSelector from "./RuleSelector";

interface Props {
  neuron: Neuron;
  rule: Rule;
  handlers: Handlers;
}

const RuleBuilder = ({ neuron, rule, handlers }: Props) => {
  const { regex, consumed, produced, delay } = rule;

  const regexOk = regex.length > 0;
  const consumedOk =
    consumed >= 1 &&
    (isNaN(produced) || consumed >= produced) &&
    !isNaN(consumed);
  const producedOk = consumed >= produced && !isNaN(produced);
  const delayOk = !isNaN(delay);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <div>
          Editing rule{" "}
          <RuleSelector
            neuron={neuron}
            ruleString={getRuleString(rule)}
            handlers={handlers}
          />{" "}
          in <InlineMath math={`${neuron.label}`} />
        </div>
        <div
          className="h-6 w-6 border ml-auto border-solid border-lilac rounded-full hover:cursor-pointer hover:bg-lilac hover:text-white flex justify-center items-center text-xl"
          onClick={() => {
            handlers.addRule();
            handlers.setRule([neuron.id, neuron.rules.length]);
          }}
        >
          <AiOutlinePlus />
        </div>
        {neuron.rules.length > 1 && (
          <div
            className="h-6 w-6 border ml-2 border-solid border-lilac rounded-full hover:cursor-pointer hover:bg-lilac hover:text-white flex justify-center items-center text-xl"
            onClick={() => {
              const ruleIndex = handlers.deleteRule();
              handlers.setRule([neuron.id, Math.max(0, ruleIndex - 1)]);
            }}
          >
            <AiOutlineMinus />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Regex</p>
          <input
            type="text"
            value={regex}
            placeholder="a^{2}"
            onChange={(e) => handlers.setRegex(e.target.value)}
            className={`w-full rounded-md border-2 border-solid ${
              regexOk ? "border-green-600" : "border-red-600"
            } px-3 py-1`}
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
            className={`w-full rounded-md border-2 border-solid ${
              consumedOk ? "border-green-600" : "border-red-600"
            } px-3 py-1`}
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
            className={`w-full rounded-md border-2 border-solid ${
              producedOk ? "border-green-600" : "border-red-600"
            } px-3 py-1`}
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
            className={`w-full rounded-md border-2 border-solid ${
              delayOk ? "border-green-600" : "border-red-600"
            } px-3 py-1`}
          />
        </label>
      </div>
    </div>
  );
};

export default RuleBuilder;
