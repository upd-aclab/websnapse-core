interface Selected {
  neuron: number;
  rule: [number, number];
  synapse: [number, number];
}

const defaultSelected: Selected = {
  neuron: 1,
  rule: [1, 0],
  synapse: [1, 2],
};

export default Selected;
export { defaultSelected };
