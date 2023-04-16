const sameTuple = (a: [any, any], b: [any, any]): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

export default sameTuple;
