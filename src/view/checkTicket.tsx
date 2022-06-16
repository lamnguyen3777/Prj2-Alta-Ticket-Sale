import React from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { Row, Col, Card, Space, Input, Button, Table, Form, DatePicker, Radio } from 'antd';
import moment from 'moment';

// import ModalBox from '../shared/components/modal';
import Data from '../core/dummyData/ticketList.json';
import Column from '../core/dummyData/fieldTable2.json';

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

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<dataProps> = Column;

const data: dataProps[] = Data;

const Check: React.FC = () => (
    <Row gutter={3}>
        <Col flex={2}>
            <Card >
                <h1>Danh sách vé</h1>
                <Space className='content-nav' direction="horizontal">
                    <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    <div className='buttonGroup'>
                        {/* <ModalBox component={ <Icon component={Filter}/> } /> */}
                        <Button
                            type="primary" ghost
                            onClick={() => console.log('Clicked')}
                        >
                            Chốt đối soát
                        </Button>
                    </div>
                </Space>
                <Table columns={columns} dataSource={data} />
            </Card>
        </Col>
        <Col flex={1}>
            <Card >
                <h1>Lọc vé</h1>
                <Form>
                    <Form.Item>
                        <label htmlFor='tikectStatus'>Tình trạng đối soát</label>
                        <Radio.Group>
                            <Radio value={0}>Tất cả</Radio>
                            <Radio value={1}>Đã đối soát</Radio>
                            <Radio value={2}>Chưa đối soát</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor='typeTicket'>Loại vé: </label>
                        <span>Vé cổng</span>
                    </Form.Item>
                    <Form.Item>
                        <Input.Group compact>
                            <Col span={12}>
                                <label htmlFor='dateFrom'>Từ ngày</label>
                                <DatePicker id='dateFrom' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                            </Col>
                            <Col span={12}>
                                <label htmlFor='dateTo'>Đến ngày</label>
                                <DatePicker id='dateTo' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                            </Col>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Lọc
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
);

export default Check;