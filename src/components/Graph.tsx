import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { InlineMath } from "react-katex";

interface DraggableNodeProps {
  id: string;
  contents: JSX.Element | string;
}

const DraggableNode = ({ id, contents }: DraggableNodeProps) => {
  const updateXArrow = useXarrow();
  return (
    <Draggable onDrag={updateXArrow} onStop={updateXArrow}>
      <div
        id={id}
        className="flex w-fit items-center justify-center rounded-md bg-white px-3 py-1 text-black hover:cursor-move"
      >
        {contents}
      </div>
    </Draggable>
  );
};

const Graph = () => {
  return (
    <div className="h-[20rem] w-full bg-black">
      <Xwrapper>
        <DraggableNode
          id="0"
          contents={<InlineMath math="a/a \rightarrow a; 0" />}
        />
        <DraggableNode
          id="1"
          contents={<InlineMath math="a^{2}/a \rightarrow a; 1" />}
        />
        <Xarrow start="0" end="1" />
      </Xwrapper>
    </div>
  );
};

export default Graph;
