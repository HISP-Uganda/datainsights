import React from "react";
import Plot from "react-plotly.js";
import { useRecoilValue } from "recoil";
import { acrossCountry, titleAtom } from "../atoms";

export const CountryLineGraph = () => {
  const data = useRecoilValue(acrossCountry);
  const title = useRecoilValue(titleAtom);
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Plot
        data={data}
        layout={{
          // width: window.innerWidth - 400 - 20,
          // height: window.innerHeight / 2,
          title,
        }}
        config={{ displayModeBar: false }}
      />
    </React.Suspense>
  );
};
