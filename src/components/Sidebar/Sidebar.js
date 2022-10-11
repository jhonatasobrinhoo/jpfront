import {PieChartOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";

const itemList = (admin) => [
    {
        label: 'Hábitos',
        key: '1',
        icon: <PieChartOutlined/>,
        route: '/dashboard/habits'
    },
    admin && {
        label: 'Contatos',
        key: '2',
        icon: <UserOutlined/>,
        route: '/dashboard/contacts'
    },
]

const getItemList = (admin) => {
    return itemList(admin).map(item => {
        return <Menu.Item icon={item.icon} key={item.key}>
            <Link to={item.route} key={item.key}>
                {item.label}
            </Link>
        </Menu.Item>
    })
}

const Sidebar = ({collapsed, setCollapsed}) => {
    return <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline">
            {getItemList(true)}
        </Menu>
    </Sider>
}

export default Sidebar;