import React from "react";
import { Textfit } from "react-textfit";

const Screen = ({ value }) => {
  return (
    <Textfit className="screen" mode="single">
      {value}
    </Textfit>
  );
};

export default Screen;
