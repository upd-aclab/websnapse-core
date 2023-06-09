import { useAtom, useSetAtom, type PrimitiveAtom } from "jotai";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { InlineMath } from "react-katex";
import { nudgeNeuronsAtom, resetSelectedRuleAtom } from "~/atoms/actions";
import type Neuron from "~/types/Neuron";
import type Rule from "~/types/Rule";
import { defaultRule } from "~/types/Rule";
import getRuleString from "~/utils/getRuleString";
import RuleSelector from "./RuleSelector";

interface Props {
  neuronAtom: PrimitiveAtom<Neuron>;
  ruleAtom: PrimitiveAtom<Rule>;
}

const RuleBuilder = ({ neuronAtom, ruleAtom }: Props) => {
  const [neuron, setNeuron] = useAtom(neuronAtom);
  const [rule, setRule] = useAtom(ruleAtom);
  const resetSelectedRule = useSetAtom(resetSelectedRuleAtom);
  const { regex, consumed, produced, delay, selected } = rule;

  const regexOk = regex.length > 0;
  const consumedOk =
    consumed >= 1 &&
    (isNaN(produced) || consumed >= produced) &&
    !isNaN(consumed);
  const producedOk = consumed >= produced && !isNaN(produced);
  const delayOk = !isNaN(delay);

  const nudgeNeurons = useSetAtom(nudgeNeuronsAtom);

  return (
    <div className={`flex flex-col gap-3 ${selected ? "visible" : "hidden"}`}>
      <div className="flex items-center">
        <div>
          Editing rule{" "}
          <RuleSelector
            neuronAtom={neuronAtom}
            ruleString={getRuleString(rule)}
          />{" "}
          in <InlineMath math={`${neuron.label}`} />
        </div>
        <div
          className="h-6 w-6 ml-auto hoverable rounded-full flex justify-center items-center text-xl"
          onClick={() => {
            resetSelectedRule(neuronAtom);
            setNeuron((previousNeuron) => ({
              ...previousNeuron,
              rules: [
                ...previousNeuron.rules,
                { ...defaultRule, selected: true },
              ],
            }));
            nudgeNeurons();
          }}
        >
          <AiOutlinePlus />
        </div>
        <div
          className={`h-6 w-6 ml-2 ${
            neuron.rules.length > 1 ? "hoverable" : "not-hoverable"
          } rounded-full flex justify-center items-center text-xl`}
          onClick={() => {
            if (neuron.rules.length > 1) {
              let i = 0;
              for (let j = 0; j < neuron.rules.length; ++j) {
                if (neuron.rules[j]?.selected) {
                  i = j;
                }
              }
              i = Math.min(i, neuron.rules.length - 2);
              setNeuron((previousNeuron) => ({
                ...previousNeuron,
                rules: previousNeuron.rules
                  .filter((rule) => !rule.selected)
                  .map((rule, index) => ({
                    ...rule,
                    selected: i === index,
                  })),
              }));
              nudgeNeurons();
            }
          }}
        >
          <AiOutlineMinus />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Regex</p>
          <input
            type="text"
            value={regex}
            placeholder="a^{2}"
            onChange={(e) =>
              setRule((previousRule) => ({
                ...previousRule,
                regex: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setRule((previousRule) => ({
                ...previousRule,
                consumed: parseInt(e.target.value),
                produced: Math.min(
                  previousRule.produced,
                  parseInt(e.target.value)
                ),
              }))
            }
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
            onChange={(e) =>
              setRule((previousRule) => ({
                ...previousRule,
                produced: parseInt(e.target.value),
              }))
            }
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
            onChange={(e) =>
              setRule((previousRule) => ({
                ...previousRule,
                delay: parseInt(e.target.value),
              }))
            }
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
