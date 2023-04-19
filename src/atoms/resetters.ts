import { atom } from "jotai";
import { neuronsAtom, synapsesAtom } from "./primitives";

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

export { resetSelectedNeuronAtom, resetSelectedSynapseAtom };
