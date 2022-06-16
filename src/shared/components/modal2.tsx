import { useState } from 'react';
import { Modal, Button, DatePicker, Form } from 'antd';
import moment from 'moment';
import './modal.css';

const ModalBox = (props: any): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('Click OK');
        setIsModalVisible(false);
    };

    const handleCancle = () => {
        console.log('Click Cancel');
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary" ghost
                icon={ props.component }
                onClick={showModal}
            >
                Đổi ngày sử dụng vé
            </Button>
            <Modal
                title="Đổi ngày sử dụng vé"
                visible={isModalVisible}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        onClick={handleCancle}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="link"
                        type="primary"
                        onClick={handleOk}
                    >
                        Lưu
                    </Button>
                ]}
            >
                <Form>
                    <Form.Item>
                        <label htmlFor='ticketNum'>Số vé: </label>
                        <span>ABC</span>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor='typeTicket'>Loại vé: </label>
                        <span>Vé cổng</span>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor='event'>Tên sự kiện: </label>
                        <span>Tết</span>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor='dateFrom'>Hạn sử dụng: </label>
                        <DatePicker id='dateFrom' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalBox;