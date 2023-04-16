interface Selected {
  neuron: number;
  rule: number;
  synapse: number;
}

const defaultSelected: Selected = {
  neuron: 1,
  rule: 0,
  synapse: 0,
};

export default Selected;
export { defaultSelected };
