import { useAtom } from "jotai";
import { useEffect } from "react";
import { simulatingAtom, timeAtom } from "~/atoms/primitives";

const Simulator = () => {
  const [time, setTime] = useAtom(timeAtom);
  const [simulating, setSimulating] = useAtom(simulatingAtom);

  useEffect(() => {
    if (simulating) {
      const intervalId = setTimeout(() => {
        setTime((previousTime) => previousTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [simulating, setTime]);

  return (
    <section className="w-full">
      Simulator
      <div>Time: {time}</div>
      <button
        onClick={() =>
          setSimulating((previousSimulating) => !previousSimulating)
        }
      >
        Toggle Timer
      </button>
    </section>
  );
};

export default Simulator;
