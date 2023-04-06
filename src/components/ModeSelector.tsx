import { type Dispatch, type SetStateAction } from "react";
import { FaHammer, FaPlay } from "react-icons/fa";

interface Props {
  mode: number;
  setMode: Dispatch<SetStateAction<number>>;
}

const ModeSelector = ({ mode, setMode }: Props) => {
  const modes = [
    {
      icon: <FaHammer size={20} />,
    },
    {
      icon: <FaPlay size={20} />,
    },
  ];

  return (
    <div className="flex w-14 flex-col justify-start">
      {modes.map(({ icon }, index) => (
        <div
          className={`cursor-pointer border-b-2 border-r-2 border-solid border-lilac h-14 w-14 ${
            index === modes.length - 1 ? "rounded-br-lg" : ""
          } ${mode !== index ? "hover:bg-lilac hover:text-white" : ""}`}
          key={index}
        >
          <div
            className={`flex h-14 w-14 items-center border-l-2 border-solid ${
              mode === index ? "border-white" : "border-lilac"
            } justify-center p-4`}
            onClick={() => setMode(index)}
          >
            {icon}
          </div>
        </div>
      ))}
      <div className="h-full border-l-2 border-solid border-lilac" />
    </div>
  );
};

export default ModeSelector;