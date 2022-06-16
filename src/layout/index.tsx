import React from 'react';
import { Layout } from 'antd';
import SiderLayout from './sider/sider';
import HeaderLayout from './header/header';
import ContentLayout from './content/content';

const IndexLayout: React.FC = () => (
    <Layout className='index-layout'>
        <SiderLayout />
        <HeaderLayout />
        <ContentLayout />
    </Layout>
);

export default IndexLayout;