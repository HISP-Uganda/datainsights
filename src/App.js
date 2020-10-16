import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";

const query = {
  me: {
    resource: "me",
  },
  indicatorGroup: {
    resource: "indicators",
    params: { paging: "false" },
  },
};

const MyApp = () => (
  <div className={classes.container}>
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
        return <pre>{JSON.stringify(data.indicatorGroup, null, 2)}</pre>;
      }}
    </DataQuery>
  </div>
);

export default MyApp;
