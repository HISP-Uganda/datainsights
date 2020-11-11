import React from "react";
import Plot from "react-plotly.js";
import { useRecoilValue } from "recoil";
import { byDistrict, titleAtom } from "../atoms";

export const GraphChart = () => {
  const data = useRecoilValue(byDistrict);
  var layout = {
    annotations: [
      {
        showarrow: false,
        text: "branchvalues: <b>remainder</b>",
        x: 0.25,
        xanchor: "center",
        y: 1.1,
        yanchor: "bottom",
      }
    ],
  };
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false }}
      />
    </React.Suspense>
  );
};
