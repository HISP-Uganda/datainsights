import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { StackedBarGraph } from "./components/StackedBarGraph";
import { Map } from "./components/Map";

const query = {
  me: {
    resource: "me",
  },
  indicatorGroups: {
    resource: "indicatorGroups",
    params: { paging: "false" },
  },
};

const MyApp = () => (
  <div>
    <StackedBarGraph />
    <Map />
  </div>
);

export default MyApp;
