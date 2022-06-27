import React, { useEffect, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DatePicker from "../../components/DatePicker";
import { Doughnut } from "react-chartjs-2";
import { ChartType, getChartData } from "../../api/crudData";
import { DateTime } from "../../components/Calendar";

ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {};

interface ChartDate {
  month: number;
  year: number;
}

const PieChart = (props: Props) => {
  const [pie, setPie] = useState<ChartDate & ChartType>(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return {
      month,
      year,
      familyPackages: { used: 0, unused: 0 },
      eventPackages: { used: 0, unused: 0 },
    };
  });
  const handleGetDate = (date: DateTime) => {
    setPie({
      ...pie,
      month: date.month,
      year: date.year,
    });
  };
  const dataFamilyPie = {
    datasets: [
      {
        label: "# of Votes",
        data: [pie.familyPackages.used, pie.familyPackages.unused],
        backgroundColor: ["#4F75FF", "#FF8A48"],
        borderColor: ["#4F75FF", "#FF8A48"],
        borderWidth: 1,
      },
    ],
  };
  const dataEventPie = {
    datasets: [
      {
        label: "# of Votes",
        data: [pie.eventPackages.used, pie.eventPackages.unused],
        backgroundColor: ["#4F75FF", "#FF8A48"],
        borderColor: ["#4F75FF", "#FF8A48"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getChartData(pie.month, pie.year)
      .then((res) => {
        setPie({
          ...pie,
          familyPackages: res.familyPackages,
          eventPackages: res.eventPackages,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pie.month, pie.year]);
  return (
    <div className="home__package">
      <div className="home__package__date">
        <DatePicker
          onGetDate={handleGetDate}
          type={0}
          date={{ day: 0, month: pie.month, year: pie.year }}
        />
      </div>
      <div className="home__package__chart">
        <p className="home__chart__title sub__title">Gói gia đình</p>
        <div className="home__chart__pie">
          <Doughnut data={dataFamilyPie} />
          { (pie.familyPackages.used !== 0 ||
            pie.familyPackages.unused !== 0) && (
              <>
                <div className="chart__pie__tooltip chart__pie__used">
                  {pie.familyPackages.unused}
                </div>
                <div className="chart__pie__tooltip chart__pie__unused">
                  {pie.familyPackages.used}
                </div>
              </>
            )}
        </div>
      </div>
      <div className="home__package__chart">
        <p className="home__chart__title sub__title">Gói sự kiện</p>
        <div className="home__chart__pie">
          <Doughnut data={dataEventPie} />
          {(pie.eventPackages.used !== 0 ||
            pie.eventPackages.unused !== 0) && (
              <>
                <div className="chart__pie__tooltip chart__pie__used">
                  {pie.eventPackages.unused}
                </div>
                <div className="chart__pie__tooltip chart__pie__unused">
                  {pie.eventPackages.used}
                </div>
              </>
            )}
        </div>
      </div>
      <div className="home__package__chart">
        <p className="home__chart__title sub__title"></p>
        <div className="home__chart__note">
          <div className="chart__note__used">
            <span></span>
            <span>Vé đã sử dụng</span>
          </div>
          <div className="chart__note__unused">
            <span></span>
            <span>Vé chưa sử dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
