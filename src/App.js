import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import React from "react";
import "./App.css";
import { Home } from "./components/Home";
import { Provider } from "./Context";
import { Store } from "./Store";

import "./index.css";
import "antd/dist/antd.css";
import { RecoilRoot } from "recoil";
import { Wrapper } from "./Wrapper";

const d2Config = {};

const authorization =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DHIS2_AUTHORIZATION
    : null;
if (authorization) {
  d2Config.headers = { Authorization: authorization };
}
const MyApp = () => {
  return (
    <RecoilRoot>
      <D2Shim d2Config={d2Config} i18nRoot="./i18n">
        {({ d2, d2Error }) => {
          if (d2Error) {
            return <div>Error</div>;
          } else if (!d2) {
            return <div>Loading</div>;
          } else {
            return <Wrapper d2={d2} />;
          }
        }}
      </D2Shim>
    </RecoilRoot>
  );
};

export default MyApp;
