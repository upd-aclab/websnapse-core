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
};
