import { type Dispatch, type SetStateAction } from "react";
import { InlineMath } from "react-katex";
import type Neuron from "~/types/Neuron";
import type System from "~/types/System";

interface Props {
  neuron: Neuron;
  selectedNeuron: number;
  selectedRule: number;
  setSystem: Dispatch<SetStateAction<System>>;
}

const RuleBuilder = ({
  neuron,
  selectedNeuron,
  selectedRule,
  setSystem,
}: Props) => {
  const setRegex = (regex: string) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          regex:
            neuron.id === selectedNeuron && index === selectedRule
              ? regex
              : rule.regex,
        })),
      })),
    }));
  };

  const setConsumed = (consumed: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          consumed:
            neuron.id === selectedNeuron && index === selectedRule
              ? consumed
              : rule.consumed,
        })),
      })),
    }));
  };

  const setProduced = (produced: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          produced:
            neuron.id === selectedNeuron && index === selectedRule
              ? produced
              : rule.produced,
        })),
      })),
    }));
  };

  const setDelay = (delay: number) => {
    setSystem((previousSystem) => ({
      ...previousSystem,
      neurons: previousSystem.neurons.map((neuron) => ({
        ...neuron,
        rules: neuron.rules.map((rule, index) => ({
          ...rule,
          delay:
            neuron.id === selectedNeuron && index === selectedRule
              ? delay
              : rule.delay,
        })),
      })),
    }));
  };

  const { regex, consumed, produced, delay } = neuron.rules[selectedRule]!;

  return (
    <div className="flex flex-col gap-3">
      <div>
        Editing rule #{selectedRule} (0-indexed) in neuron{" "}
        <InlineMath math={`${neuron.label}`} />:
      </div>
      <div className="flex flex-col gap-3">
        <label className="flex items-center">
          <p className="w-36">Regex</p>
          <input
            type="text"
            value={regex}
            placeholder="a^{2}"
            onChange={(e) => setRegex(e.target.value)}
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
              setConsumed(parseInt(e.target.value));
              setProduced(Math.min(produced, parseInt(e.target.value)));
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
            onChange={(e) => setProduced(parseInt(e.target.value))}
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
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full rounded-md border border-solid border-lilac px-3 py-1"
          />
        </label>
      </div>
    </div>
  );
};

export default RuleBuilder;
