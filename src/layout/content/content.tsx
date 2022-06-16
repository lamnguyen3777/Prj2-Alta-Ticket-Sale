import React from 'react';
import { Layout } from 'antd';
import Router from '../../routes/route'

const { Content } = Layout;

const ContentLayout: React.FC = () => (
    <Content className='content-layout'>
        <Router />
    </Content>
);

export default ContentLayout;