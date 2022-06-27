import { Area, Line } from "@ant-design/plots";
import moment, { monthsShort } from "moment";
import React, { useEffect, useState } from "react";
import { revenue } from "../../api/crudData";
import { DateTime, DateType } from "../../components/Calendar";
import DatePicker from "../../components/DatePicker";
import { formatCurrency } from "../../utils/convertCurrency";
import {
  convertRevenue,
  getCurrency,
  getDateBefore,
} from "../../utils/dateTime";
type Props = {};

export interface LineChart {
  day: string;
  revenue: number;
}

const LineChart = (props: Props) => {
  const [data, setData] = useState<LineChart[]>([]);
  const [date, setDate] = useState<DateTime>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [week, setWeek] = useState<DateType[]>(() => {
    return getDateBefore({ ...date }, 7).reverse();
  });

  useEffect(() => {
    const dateTimeMap = week.map((item) => {
      return {
        day: item.value,
        month:
          item.type === 0
            ? date.month
            : item.type === -1
            ? date.month < 2
              ? 12
              : date.month - 1
            : date.month < 12
            ? date.month + 1
            : 1,
        year:
          item.type === 0
            ? date.year
            : item.type === -1
            ? date.month === 1
              ? date.year - 1
              : date.year
            : date.month === 12
            ? date.year + 1
            : date.year,
      };
    });

    revenue(dateTimeMap)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [date.month, date.year, week]);

  const config = {
    data,
    xField: "day",
    yField: "revenue",
    // seriesField: "name",
    yAxis: {
      label: {
        formatter: (v: any) =>
          `${v} ${getCurrency(data.map((item) => item.revenue))}`,
      },
    },
    xAxis: {
      range: [0, 1],
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#ffa010 1:#da8300",
      };
    },
    theme: {
      styleSheet: {
        brandColor: "#FF993C",
      },
    },
    // legend: {
    //   position: 'top',
    // },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  const handleGetDate = (date: DateTime) => {
    setDate(date);
  };

  const handleGetWeek = (days: DateType[]) => {
    setWeek(days);
  };

  const totalRevenue = () => {
    let rs = 0;

    data.forEach((item) => {
      rs += item.revenue;
    });

    return rs;
  };

  return (
    <>
      <div className="home__profit">
        <p className="sub__title home__profit__title">Doanh thu</p>
        <DatePicker
          onGetDate={handleGetDate}
          type={0}
          date={{ day: 0, month: date.month, year: date.year }}
          pos="bottom-right"
          onGetWeek={handleGetWeek}
        />
      </div>
      <div className="home__chart">
        <Area {...config} />
      </div>
      <div className="home__revenue">
        <p>Tổng doanh thu theo {data.length > 7 ? "tháng" : "tuần"}</p>
        <p>
          {formatCurrency(totalRevenue())} <span>đồng</span>
        </p>
      </div>
    </>
  );
};

export default LineChart;
