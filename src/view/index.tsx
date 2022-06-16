import { Area, Pie } from '@ant-design/plots';
import { Statistic, DatePicker } from 'antd';
import moment from 'moment';

import Data1 from '../core/dummyData/areaChart.json';
import Data2 from '../core/dummyData/pieChart.json'

const Home = (): JSX.Element => {

    const config1 = {
        data: Data1,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1]
        },
    };
    const config2 = {
        appendPadding: 10,
        data: Data2,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 10,
            }
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            }
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'Pie1',
            }
        }
    };

    return (
        <>
            <h1>Thống kê</h1>
            <div>
                <h3>Doanh thu</h3>
                <DatePicker defaultValue={moment('2015/01', 'MM/YYYY')} format={'MM/YYYY'} picker="month" />
                <Area {...config1} />
            </div>
            <div><Statistic title="Tổng doanh thu" value={112893} precision={2} /></div>
            <div style={{ display: "flex" }}>
                <div><DatePicker defaultValue={moment('2015/01', 'MM/YYYY')} format={'MM/YYYY'} picker="month" /></div>
                <div><Pie {...config2} /></div>
                <div><Pie {...config2} /></div>
            </div>
        </>
    );
};

export default Home;