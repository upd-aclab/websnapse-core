interface Rule {
  regex: string;
  consumed: number;
  produced: number;
  delay: number;
  selected?: boolean;
}

const defaultRule: Rule = {
  regex: "a",
  consumed: 1,
  produced: 1,
  delay: 0,
};

export default Rule;
export { defaultRule };
