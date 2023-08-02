import React, { useState } from "react";
import { styled } from "styled-components";
import { Menu as AntMenu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [getItem("Квартиры", "1"), getItem("Менеджеры", "2")];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = ({ key }) => {
    if (key === "2") {
      navigate("/user/managers");
    } else if (key === "1") {
      navigate("/user/flats");
    }
  };

  return (
    <>
      <AntSider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <AntMenu
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={handleClick}
        />
      </AntSider>
    </>
  );
};
export default SideBar;

const AntSider = styled(Sider)`
  & .ant-layout-sider-children {
    background-color: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 20px 0px #0000000d;
    height: 100%;
    padding-top: 50px;
  }
`;
