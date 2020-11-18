import React from "react";
import Plot from "react-plotly.js";
import { useRecoilValue } from "recoil";
import { acrossCountry, titleAtom } from "../atoms";

export const CountryLineGraph = () => {
  const data = useRecoilValue(acrossCountry);
  const title = useRecoilValue(titleAtom);
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <div className="shadow-sm p-3 mb-5 rounded m-top-24">
        <div className="data-card__header-container">
          <h3 style={{ color: "white", textAlign: "center" }}>
            Overview: Across the country, the number of children under one
            receiving their DPT3 vaccine remained stable between Sep-2019 and
            Sep-2020
          </h3>
        </div>
        <Plot
          data={data}
          layout={{
            title,
            width: 1300,
            height: 480,
            legend: {
              orientation: "h",
              yanchor: "bottom",
              y: 1.02,
              xanchor: "right",
              x: 1,
            },
            margin: {
              pad: 20,
              r: 5,
              // t: 20,
              l: 5,
              // b: 20,
            },
            plot_bgcolor: "rgba(255, 255, 255, 1)",
            paper_bgcolor: "rgba(255, 255, 255, 1)",
            xaxis: {
              showgrid: false,
              zeroline: false,
            },
            yaxis: {
              showgrid: true,
              zeroline: false,
              gridcolor: "LightGray",
            },
          }}
          config={{ displayModeBar: false }}
        />
      </div>
    </React.Suspense>
  );
};
