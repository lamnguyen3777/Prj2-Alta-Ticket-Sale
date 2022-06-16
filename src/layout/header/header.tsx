import React from 'react';
import { Layout, Space, Input, Avatar } from 'antd';
import { MailOutlined, BellOutlined } from '@ant-design/icons';
import Account from '../../shared/images/Frame 54.svg';

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const HeaderLayout: React.FC = () => (
    <Header className="header-layout">
        <Space className="left-header" direction="vertical">
            <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
        </Space>
        <div className="right-header">
            <MailOutlined />
            <BellOutlined />
            <Avatar size={48} src={Account} />
        </div>
    </ Header>
);

export default HeaderLayout;