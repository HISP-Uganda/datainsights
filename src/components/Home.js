import { CloudDownloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Space, DatePicker } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchIndicatorGroupSetsAtom,
  indicatorGroupAtom,
  indicatorsAtom,
  indicatorAtom,
  policyAtom,
  fetchOrganisations,
  organisationAtom,
  periodAtom,
} from "../atoms";
import { Header } from "./Header";
import { CountryLineGraph } from "./CountryLineGraph";
import { DistrictLineGraph } from "./DistrictLineGraph";
import { GraphChart } from "./GraphChart";

// import head from "../UNICEF-MOH-header-resized.jpg";
// import tail from "../UNICEF-MOH-bottom-resized.jpg";

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

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div className="bg-gray-100">
      <div
        className="w-screen text-white flex flex-center items-center justify-center text-2xl ml-auto mr-auto"
        style={{ background: "#333" }}
      >
        <div className="flex" style={{ width: "70%" }}>
          <div
            className="flex text-white items-center justify-center"
            style={{}}
          >
            <a
              href="#responsive-header"
              className="text-white items-center p-3 hover:text-black hover:bg-white hover:text-black"
            >
              Trend
            </a>
            <a
              href="#responsive-header"
              className="text-white items-center p-3 hover:text-black hover:bg-white hover:text-black"
            >
              Reporting
            </a>
            <a
              href="#responsive-header"
              className="text-white items-center p-3 hover:text-black hover:bg-white hover:text-black"
            >
              Overview(Coming soon)
            </a>
          </div>
          <div className="ml-auto flex items-center justify-center">
            <Button
              onClick={showModal}
              size="large"
              className=" p-3 hover:text-black hover:bg-white hover:text-black"
            >
              Controls
            </Button>
            &nbsp; &nbsp;
            <CloudDownloadOutlined className="text-white items-center p-3 m-0 hover:text-black hover:bg-white hover:border-b-1 hover:text-black" />
            &nbsp; &nbsp;
            <InfoCircleOutlined />
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <img src={head} />
      </div> */}
      <div className="outer">
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <span className="w-full text-center">
            Select outlier correction policy
          </span>
          <Select value={policy} style={{ width: "100%" }} onChange={setPolicy}>
            <Option value="Keep outliers">Keep outliers</Option>
            <Option value="Correct outliers using SD">
              Correct outliers - using standard deviation
            </Option>
            <Option value="Correct outliers using ICR">
              Correct outliers - using interquartile range
            </Option>
            <Option value="Report">Report</Option>
          </Select>
          <span className="w-full text-center">Select indicator</span>
          <Select
            value={indicatorGroup}
            style={{ width: "100%" }}
            onChange={setIndicatorGroup}
          >
            {indicatorGroups.map((i) => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
          <Select
            value={indicator}
            style={{ width: "100%" }}
            onChange={setIndicator}
          >
            {indicators.map((i) => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
          <span className="w-full text-center">Select period</span>

          <RangePicker picker="month" value={period} onChange={setPeriod} />

          <span className="w-full text-center">Select district</span>
          <Select
            value={organisation}
            style={{ width: "100%" }}
            onChange={setOrganisation}
          >
            {organisations.map((i) => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Space>

        <div className="flex graphs flex-col">
          <Header />
          <CountryLineGraph />
          <DistrictLineGraph />
          {/* <GraphChart /> */}
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <img src={store.indicatorGroups} />
      </div> */}
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
});
