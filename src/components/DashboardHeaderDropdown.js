import {useAuth} from "../contexts/auth/AuthContext";
import {Avatar, Badge, Dropdown, Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import MenuDivider from "antd/es/menu/MenuDivider";
import {createFromIconfontCN, UserOutlined} from "@ant-design/icons";
import React from "react";

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_3697757_e8fdcq5i8x.js'
    ],
});

const DashboardHeaderMenu = () => {
    const {user, logout} = useAuth();

    const onMenuClick = ({_, key}) => {
        if (key === "logout") {
            logout();
        }
    }

    return <Menu onClick={onMenuClick}>
        <MenuItem key="0" disabled style={{cursor: 'default'}}>
            <span>User: {user.username}</span>
        </MenuItem>
        <MenuDivider/>
        <MenuItem key="logout" icon={<IconFont style={{fontSize: '24px'}} type="icon-log-out"/>}>
            Logout
        </MenuItem>
    </Menu>
}

const DashboardHeaderDropdown = () => (
    <div style={{float: "right", marginRight: '15px', cursor: 'pointer'}}>
        <Dropdown overlay={<DashboardHeaderMenu/>}
                  trigger={['click']}
                  placement="bottomLeft"
                  overlayStyle={{minWidth: '200px'}}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={e => e.preventDefault()}>
                <Badge
                    // count={1}
                >
                    <Avatar shape="circle" size="large" icon={<UserOutlined/>}/>
                </Badge>
            </a>
        </Dropdown>
    </div>
)

export default DashboardHeaderDropdown;