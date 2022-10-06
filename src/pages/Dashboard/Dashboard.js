import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import DashboardContent from "./DashboardContent";
import {DateTime} from "luxon";

const {Header, Content, Footer, Sider} = Layout;

function getItem(
    label,
    key,
    icon,
    children,
) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header theme="dark" className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <DashboardContent />
                </Content>
                <Footer style={{textAlign: 'center'}}>Joice Personal ©{DateTime.now().year}</Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;