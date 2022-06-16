import { Space, Input, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import Data from '../core/dummyData/ticketGroup.json';
import Column from '../core/dummyData/fieldTable3.json';
import ModalBox3 from '../shared/components/modal3';
import ModalBox4 from '../shared/components/modal4';

type dataProps = {
    STT: Number;
    groupCode: String;
    groupName: String;
    usingDate: String;
    expDate: String;
    status: Boolean;
    costTicket: Number;
    costCombo: {
        cost: Number,
        SL: Number
    } | {};
};

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<dataProps> = Column;

const data: dataProps[] = Data;

const Setting = () => {
    return (
        <>
            <h1>Danh sách gói vé</h1>
            <Space className='content-nav' direction="horizontal">
                <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
                <div className='buttonGroup'>
                    <ModalBox3 />
                    <ModalBox4 />
                    <Button
                        type="primary" ghost
                        onClick={() => console.log('Clicked')}
                    >
                        Xuất file (.csv)
                    </Button>
                    <Button
                        type="primary" ghost
                        onClick={() => console.log('Clicked')}
                    >
                        Thêm gói vé
                    </Button>
                </div>
            </Space>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default Setting;