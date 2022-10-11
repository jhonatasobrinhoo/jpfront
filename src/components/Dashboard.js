import Sidebar from "./Sidebar/Sidebar";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {DateTime} from "luxon";
import React, {useState} from "react";
import DashboardHeaderDropdown from "./DashboardHeaderDropdown";

const Dashboard = ({location}) => {
    const [collapsed, setCollapsed] = useState(false);

    return <Layout style={{minHeight: '100vh'}}>
        <Sidebar collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} location={location}/>
        <Layout className="site-layout">
            <Header theme="dark" className="site-layout-background" style={{padding: 0}}>
                <DashboardHeaderDropdown/>
            </Header>
            <Content style={{margin: '0 16px'}}>
                <Outlet/>
            </Content>
            <Footer style={{textAlign: 'center'}}>Joice Personal ©{DateTime.now().year}</Footer>
        </Layout>
    </Layout>
}
export default Dashboard;