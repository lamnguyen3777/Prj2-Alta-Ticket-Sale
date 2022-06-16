import { Space, Input, Button, Table } from 'antd';
import Icon, { MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';

import { Filter } from '../shared/assets/icon/iconSvg';
import ModalBox1 from '../shared/components/modal1';
import ModalBox2 from '../shared/components/modal2';
// import CalendarModal from '../shared/components/calendar';
import Data from '../core/dummyData/ticketList.json';
// import Column from '../core/dummyData/fieldTable1.json';

type dataProps = {
    STT: Number;
    bookingCode: String;
    ticketNum: Number;
    event: String;
    tikectStatus: Boolean;
    typeTicket: String;
    usingDate: String;
    saledDate: String;
    checkStatus: Boolean;
    checkInGate: String;
};

const dropDown = () => {
    console.log("click")
};

const Column = [
    { title: "STT", dataIndex: "STT" },
    { title: "Booking code", dataIndex: "bookingCode" },
    { title: "Số vé", dataIndex: "ticketNum" },
    { title: "Tên sự kiện", dataIndex: "event" },
    { title: "Tình trạng sử dụng", dataIndex: "tikectStatus" },
    { title: "Ngày sử dụng", dataIndex: "usingDate" },
    { title: "Ngày xuất vé", dataIndex: "saledDate" },
    { title: "Cổng check-in", dataIndex: "checkInGate" },
    {
        title: " ",
        dataIndex: "ticketNum",
        render: () => <MoreOutlined onClick={ dropDown } />,
    }
]

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<dataProps> = Column;

const data: dataProps[] = Data;

const TicketList = () => {
    return (
        <>
            <h1>Danh sách vé</h1>
            <Space className='content-nav' direction="horizontal">
                <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
                <div className='buttonGroup'>
                    <ModalBox1 component={ <Icon component={Filter}/> } />
                    <ModalBox2 component={ <Icon component={Filter}/> } />
                    <Button
                        type="primary" ghost
                        onClick={() => console.log('Clicked')}
                    >
                        Xuất file (.csv)
                    </Button>
                </div>
            </Space>
            <Table columns={columns} pagination={ { position: ['bottomCenter'] } } dataSource={data} />
        </>
    );
};

export default TicketList;