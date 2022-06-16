import { useState } from 'react';
import { Modal, Button, DatePicker, Input, Form, Radio, Checkbox, Row, Col } from 'antd';
import moment from 'moment';
import './modal.css';

const ModalBox = (props: any): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary" ghost
                icon={ props.component }
                onClick={showModal}
            >
                Lọc vé
            </Button>
            <Modal
                title="Lọc vé"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        onClick={handleOk}
                    >
                        Lọc vé
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item>
                        <Input.Group style={{ display: 'flex' }} compact>
                            <Col span={12}>
                                <label htmlFor='dateFrom'>Từ ngày</label><br/>
                                <DatePicker id='dateFrom' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                            </Col>
                            <Col span={12}>
                                <label htmlFor='dateTo'>Đến ngày</label><br/>
                                <DatePicker id='dateTo' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                            </Col>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name="tikectStatus">
                        <label htmlFor='tikectStatus'>Tình trạng sử dụng</label><br/>
                        <Radio.Group style={{ width: '100%' }}>
                            <Radio value={0}>Tất cả</Radio>
                            <Radio value={1}>Đã sử dụng</Radio>
                            <Radio value={2}>Chưa sử dụng</Radio>
                            <Radio value={3}>Hết hạn</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="checkInGate">
                        <label htmlFor='checkInGate'>Cổng Check-in</label><br/>
                        <Checkbox.Group style={{ width: '100%' }} defaultValue={['Tất cả']}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="0">Tất cả</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="1">Cổng 1</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="2">Cổng 2</Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="3">Cổng 3</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="4">Cổng 4</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="5">Cổng 5</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalBox;