import React from 'react';
import { Image, Menu, Layout } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Home, Ticket, Invoice, List, Monitor, Setting } from '../../shared/assets/icon/iconSvg';
import Logo from '../../shared/images/insight-05 1.svg';

const { Sider } = Layout;

const SiderLayout: React.FC = () => (
    <Sider className='sider-layout'>
        <div className="logo">
            <Image className='logo-icon' src={ Logo } />
        </div>

        <Menu className='menu'>
            <Menu.Item className='menu-item' key="home" title="Trang chủ">
                <Link to="/">
                    <Icon className='item-icon' type='home' component={ Home } />
                    <span className='item-text'>Trang chủ</span>
                </Link>
            </Menu.Item>

            <Menu.Item className='menu-item' key="management" title="Quản lý vé" >
                <Link to="/ticketList">
                    <Icon className='item-icon' type='managemen' component={ Ticket } />
                    <span className='item-text'>Quản lý vé</span>
                </Link>
            </Menu.Item>

            <Menu.Item className='menu-item' key="invoice" title="Đối soát vé" >
                <Link to="/check">
                    <Icon className='item-icon' type='invoice' component={ Invoice } />
                    <span className='item-text'>Đối soát vé</span>
                </Link>
            </Menu.Item>

            <Menu.Item className='menu-item' key="list" title="Danh sách sự kiện" hidden>
                <Icon className='item-icon' type='list' component={ List } />
                <span className='item-text'>Danh sách sự kiện</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="monitor" title="Quản lý thiết bị" hidden>
                <Icon className='item-icon' type='monitor' component={ Monitor } />
                <span className='item-text'>Quản lý thiết bị</span>
            </Menu.Item>
            
            <Menu.Item className='menu-item' key="service" title="Cài đặt" >
                <Link to="/setting">
                    <Icon className='item-icon' type='service' component={ Setting } />
                    <span className='item-text'>Cài đặt</span>
                </Link>
            </Menu.Item>

            <Menu.Item className='menu-item'>
                <span className='item-text'>Gói dịch vụ</span>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SiderLayout;