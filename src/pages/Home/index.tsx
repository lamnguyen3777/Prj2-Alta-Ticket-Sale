import { Line, Mix } from "@ant-design/charts";
import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { Pie } from "@ant-design/plots";
import { Doughnut } from "react-chartjs-2";
import { DateTime } from "../../components/Calendar";
import { ChartType, getChartData } from "../../api/crudData";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="content__main">
      <div className="home">
        <p className="home__title title">Thống kê</p>
        <LineChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Home;
