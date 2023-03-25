import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { InlineMath } from "react-katex";
import { useRef } from "react";

interface DraggableNodeProps {
  id: string;
  contents: JSX.Element | string;
}

const DraggableNode = ({ id, contents }: DraggableNodeProps) => {
  const updateXArrow = useXarrow();
  const nodeRef = useRef(null);

  return (
    <Draggable onDrag={updateXArrow} onStop={updateXArrow} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        id={id}
        className="flex w-fit items-center justify-center rounded-md border-2 border-solid border-black bg-white px-3 py-1 text-black hover:cursor-move"
      >
        {contents}
      </div>
    </Draggable>
  );
};

const Graph = () => {
  return (
    <div className="h-[20rem] w-full border border-solid border-black">
      <Xwrapper>
        <DraggableNode
          id="0"
          contents={<InlineMath math="a/a \rightarrow a; 0" />}
        />
        <DraggableNode
          id="1"
          contents={<InlineMath math="a^{2}/a \rightarrow a; 1" />}
        />
        <Xarrow
          start="0"
          end="1"
          path="straight"
          color="lightgray"
          labels={
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-black bg-white">
              <InlineMath math="1" />
            </div>
          }
        />
      </Xwrapper>
    </div>
  );
};

export default Graph;
