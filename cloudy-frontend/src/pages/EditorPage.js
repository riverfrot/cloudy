import React from "react";
import EditorHeaderContainer from "containers/editor/EditorHeaderContainer";
import EditorContainer from "containers/editor/EditorContainer";

const EditorPage = ({ id }) => {
  return (
    <div>
      <EditorHeaderContainer id={id} />
      <EditorContainer id={id} />
    </div>
  );
};

export default EditorPage;
