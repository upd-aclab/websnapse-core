import manualStructuredClone from "@ungap/structured-clone";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { defaultSystem } from "~/types/System";

const systemAtom = atom(defaultSystem);

const neuronsAtom = focusAtom(systemAtom, (optic) => optic.prop("neurons"));
const synapsesAtom = focusAtom(systemAtom, (optic) => optic.prop("synapses"));
const inputNeuronsAtom = focusAtom(systemAtom, (optic) =>
  optic.prop("inputNeurons")
);
const outputNeuronsAtom = focusAtom(systemAtom, (optic) =>
  optic.prop("outputNeurons")
);

const neuronAtomsAtom = splitAtom(neuronsAtom);
const synapseAtomsAtom = splitAtom(synapsesAtom);
const inputNeuronAtomsAtom = splitAtom(inputNeuronsAtom);
const outputNeuronAtomsAtom = splitAtom(outputNeuronsAtom);

const highlightSelectedAtom = atom(true);
const modeAtom = atom(0);
const timeAtom = atom(0);
const simulatingAtom = atom(false);

const cleanSystemAtom = atom((get) => {
  const system = manualStructuredClone(get(systemAtom));
  for (const synapse of system.synapses) {
    if (Object.hasOwn(synapse, "selected")) {
      delete synapse["selected"];
    }
  }
  system.neurons.forEach((neuron) => {
    neuron.rules.forEach((rule) => {
      if (Object.hasOwn(rule, "selected")) {
        delete rule["selected"];
      }
    });
    neuron.position.x = Math.round(neuron.position.x);
    neuron.position.y = Math.round(neuron.position.y);
    if (Object.hasOwn(neuron, "selected")) {
      delete neuron["selected"];
    }
  });
  return system;
});

export {
  systemAtom,
  neuronsAtom,
  synapsesAtom,
  inputNeuronsAtom,
  outputNeuronsAtom,
  neuronAtomsAtom,
  synapseAtomsAtom,
  inputNeuronAtomsAtom,
  outputNeuronAtomsAtom,
  highlightSelectedAtom,
  modeAtom,
  timeAtom,
  simulatingAtom,
  cleanSystemAtom,
};
