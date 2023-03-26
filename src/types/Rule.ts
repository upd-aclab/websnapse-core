interface Rule {
  regex: string;
  consumed: number;
  produced: number;
  delay: number;
}

export default Rule;
