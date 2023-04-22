import { atom, type PrimitiveAtom } from "jotai";
import type Neuron from "~/types/Neuron";
import { neuronsAtom, synapsesAtom } from "./primitives";

const resetSelectedRuleAtom = atom(
  null,
  (get, set, neuronAtom: PrimitiveAtom<Neuron>) =>
    set(neuronAtom, {
      ...get(neuronAtom),
      rules: get(neuronAtom).rules.map((rule) => ({
        ...rule,
        selected: false,
      })),
    })
);

const resetSelectedNeuronAtom = atom(null, (get, set) =>
  set(
    neuronsAtom,
    get(neuronsAtom).map((neuron) => ({
      ...neuron,
      rules: neuron.rules.map((rule) => ({
        ...rule,
        selected: false,
      })),
      selected: false,
    }))
  )
);

const resetSelectedSynapseAtom = atom(null, (get, set) =>
  set(
    synapsesAtom,
    get(synapsesAtom).map((synapse) => ({
      ...synapse,
      selected: false,
    }))
  )
);

export {
  resetSelectedRuleAtom,
  resetSelectedNeuronAtom,
  resetSelectedSynapseAtom,
};
