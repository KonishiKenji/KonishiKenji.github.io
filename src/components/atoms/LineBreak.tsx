import * as React from "react";

const LineBreak = ({ text = "", needBlankText = false }) => (
  <span>
    {text
      ? text.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))
      : needBlankText
      ? "-"
      : null}
  </span>
);

export default LineBreak;
