import {PieChartOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {Menu} from "antd";
import React, {useEffect, useState} from "react";
import Sider from "antd/es/layout/Sider";
import {useAuth} from "../../contexts/auth/AuthContext";

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

const getSelectedKey = (admin, pathname) => {
    const item = itemList(admin).find(item => item.route === pathname);
    return item.key;
}

const Sidebar = ({collapsed, setCollapsed}) => {
    const {user} = useAuth();
    const location = useLocation();

    useEffect(() => {
        const lastActiveIndex = getSelectedKey(user.admin, location.pathname);
        changeActiveIndex(lastActiveIndex);
    }, [user.admin, location.pathname]);

    const lastIndexString = localStorage.getItem("lastActiveIndex");
    const [activeIndex, setActiveIndex] = useState(lastIndexString || '1');

    console.log('activeIndex', activeIndex)

    function changeActiveIndex(newIndex) {
        // localStorage.setItem("lastActiveIndex", newIndex);
        setActiveIndex(newIndex);
    }

    return <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeIndex]}>
            {getItemList(user.admin)}
        </Menu>
    </Sider>
}

export default Sidebar;