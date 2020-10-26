import React from "react";
import Plot from "react-plotly.js";

export const StackedBarGraph = () => {
  const trace1 = {
    x: ["giraffes", "orangutans", "monkeys"],
    y: [20, 14, 23],
    name: "SF Zoo",
    type: "bar",
  };

  const trace2 = {
    x: ["giraffes", "orangutans", "monkeys"],
    y: [12, 18, 29],
    name: "LA Zoo",
    type: "bar",
  };

  const trace3 = {
    x: ["giraffes", "orangutans", "monkeys"],
    y: [32, 15, 19],
    name: "Entebbe Zoo",
    type: "bar",
  };

  return (
    <Plot
      data={[trace1, trace2, trace2]}
      layout={{
        width: window.innerWidth,
        height: window.innerHeight / 2,
        title: "A Fancy Plot",
        barmode: "stack",
      }}
    />
  );
};
