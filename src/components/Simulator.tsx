import type System from "~/types/System";

interface Props {
  system: System;
  time: number;
  toggleSimulating: () => void;
}

const Simulator = ({ time, toggleSimulating }: Props) => {
  return (
    <section className="w-full">
      Simulator
      <div>Time: {time}</div>
      <button onClick={toggleSimulating}>Toggle Timer</button>
    </section>
  );
};

export default Simulator;
