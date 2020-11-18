import { Button, DatePicker, Select, Space } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchIndicatorGroupSetsAtom,
  fetchOrganisations,
  indicatorAtom,
  indicatorGroupAtom,
  indicatorsAtom,
  organisationAtom,
  periodAtom,
  policyAtom,
} from "../atoms";
import { CountryLineGraph } from "./CountryLineGraph";
import { Cross } from "./Cross";
import { DistrictLineGraph } from "./DistrictLineGraph";
import { Header } from "./Header";
import { ThreeLines } from "./ThreeLines";

const { Option } = Select;
const { RangePicker } = DatePicker;

export const Home = observer(() => {
  const [visible, setVisible] = useState(false);
  const indicatorGroups = useRecoilValue(fetchIndicatorGroupSetsAtom);
  const [indicatorGroup, setIndicatorGroup] = useRecoilState(
    indicatorGroupAtom
  );
  const [indicator, setIndicator] = useRecoilState(indicatorAtom);
  const [policy, setPolicy] = useRecoilState(policyAtom);

  const indicators = useRecoilValue(indicatorsAtom);
  const organisations = useRecoilValue(fetchOrganisations);
  const [organisation, setOrganisation] = useRecoilState(organisationAtom);
  const [period, setPeriod] = useRecoilState(periodAtom);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div
      style={{
        backgroundColor: "#fffff",
        overflow: "auto",
        display: "flex",
        height: window.innerHeight - 48,
        width: "100vw",
      }}
    >
      {visible && (
        <div
          style={{
            // position: "fixed",
            // top: "48px",
            backgroundColor: "rgba(34, 94, 140)",
            width: "20vw",
            height: window.innerHeight - 48,
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(19, 52, 78)",
              paddingTop: "2vh",
              paddingBottom: "2vh",
              padding: 15,
            }}
          >
            <div className="row">
              <div className="align-self-center col">
                <p
                  className="text-left"
                  style={{
                    color: "white",
                    fontSize: "1.9vh",
                    fontWeight: "100",
                    width: "80%",
                    color: "white",
                    height: "4vh",
                    margin: "0px auto",
                  }}
                >
                  CEHS APP DASHBOARDS{" "}
                  <span
                    id="main-info"
                    className="material-icons align-middle"
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      float: "right",
                      cursor: "help",
                    }}
                  >
                    info
                  </span>
                </p>
              </div>
            </div>
            <div id="nav-buttons" className="row">
              <div className="align-self-center col">
                <div id="overview-info" className="row">
                  <div className="col" style={{ width: "80%", color: "white" }}>
                    <p id="overview" className="nav-element text-left">
                      <span
                        className="material-icons align-middle"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      >
                        language
                      </span>{" "}
                      Overview
                    </p>
                  </div>
                </div>
                <div id="trends-info" className="row">
                  <div className="col" style={{ width: "80%", color: "white" }}>
                    <p id="trends" className="nav-element active text-left">
                      <span
                        className="material-icons align-middle"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      >
                        analytics
                      </span>{" "}
                      Trends
                    </p>
                  </div>
                </div>
                <div id="reporting-info" className="row">
                  <div className="col" style={{ width: "80%", color: "white" }}>
                    <p id="reporting" className="nav-element text-left">
                      <span
                        className="material-icons align-middle"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      >
                        center_focus_weak
                      </span>{" "}
                      Data quality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Space
            direction="vertical"
            size={12}
            style={{ width: "100%", padding: 15 }}
          >
            <span
              className="label"
              style={{
                flexGrow: 1,
                display: "flex",
                textTransform: "uppercase",
              }}
            >
              Select outlier correction policy
            </span>
            <Select
              size="large"
              value={policy}
              style={{ width: "100%", backgroundColor: "rgb(19, 52, 78)" }}
              onChange={setPolicy}
            >
              <Option value="Keep outliers">Keep outliers</Option>
              <Option value="Correct outliers using SD">
                Correct outliers - using standard deviation
              </Option>
              <Option value="Correct outliers using ICR">
                Correct outliers - using interquartile range
              </Option>
              <Option value="Report">Report</Option>
            </Select>
            <span
              className="label"
              style={{
                flexGrow: 1,
                display: "flex",
                textTransform: "uppercase",
              }}
            >
              Select indicator
            </span>
            <Select
              size="large"
              value={indicatorGroup}
              style={{ width: "100%", backgroundColor: "rgb(19, 52, 78)" }}
              onChange={setIndicatorGroup}
            >
              {indicatorGroups.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
            <Select
              size="large"
              value={indicator}
              style={{ width: "100%", backgroundColor: "rgb(19, 52, 78)" }}
              onChange={setIndicator}
            >
              {indicators.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
            <span
              className="label"
              style={{
                flexGrow: 1,
                display: "flex",
                textTransform: "uppercase",
              }}
            >
              Select period
            </span>

            <RangePicker picker="month" value={period} onChange={setPeriod} />

            <span
              className="label"
              style={{
                flexGrow: 1,
                display: "flex",
                textTransform: "uppercase",
              }}
            >
              Select district
            </span>
            <Select
              size="large"
              value={organisation}
              style={{ width: "100%", background: "rgb(19, 52, 78)" }}
              onChange={setOrganisation}
            >
              {organisations.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Space>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          top: "48px",
          left: visible ? "20.5vw" : "0.5vw",
          cursor: "pointer",
          display: "inline-block",
          transition: "all 0.5s ease 0s",
          zIndex: 2,
        }}
        onClick={toggleVisible}
      >
        {visible ? <Cross /> : <ThreeLines />}
      </div>
      <div
        style={{
          // position: "relative",
          zIndex: 2,
          width: "75vw",
          // background: "red",
          pointerEvents: "none",
          transition: "margin-left .5s margin-right .5s",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "25px",
          marginTop: 20,
          marginBottom: 20,
          padding: "3%",
          height: "100vh",
        }}
      >
        <div className="data-card shadow-sm p-3 mb-5 rounded m-top-24 row">
          <div id="dash-title" className="col">
            <div className="row">
              <div className="col">
                <span
                  className="material-icons align-middle"
                  style={{ color: "rgb(19, 52, 78)", fontSize: "5vw" }}
                >
                  analytics
                </span>
              </div>
              <div className="col-11">
                <div className="row">
                  <div className="col">
                    <p
                      style={{
                        fontSize: "1.7vw",
                        marginBottom: "0px",
                        fontWeight: "bold",
                      }}
                    >
                      Trends analysis over time, across districts and health
                      facilities
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p style={{ fontSize: "1.5vw", marginBottom: "0px" }}>
                      Continuity of Essential Health Services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="data-card shadow-sm p-3 mb-5 rounded m-top-24 row">
          <div className="m-bot-24 col">
            <div className="row">
              <div className="data-card__header-container col">
                <h3
                  id="fa9bcecc610_title"
                  className="w-100"
                  style={{ color: "white", textAlign: "center" }}
                >
                  Overview: Across the country, the number of children under one
                  receiving their DPT3 vaccine remained stable between Sep-2019
                  and Sep-2020{" "}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <CountryLineGraph /> */}
        <CountryLineGraph />
        <CountryLineGraph />
      </div>
    </div>
  );
});
