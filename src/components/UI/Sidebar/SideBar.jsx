import React, { useState } from "react";
import { styled } from "styled-components";
import { Menu as AntMenu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate, useSearchParams } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    children,
    label,
  };
}

const items = [getItem("Квартиры", "1"), getItem("Менеджеры", "2")];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const handleClick = ({ key }) => {
    if (key === "2" || key === "1") {
      navigate(key === "2" ? "/managers" : "/flats");
      setParams({ menuKey: key });
    }
  };

  return (
    <>
      <AntSider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <AntMenu
          selectedKeys={[params.get("menuKey")]}
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
    height: 100vh;
    width: 190px;
    position: fixed;
    padding-top: 100px;
  }
  & .ant-menu-item-selected {
    background-color: #bfc4f6;
    color: #000000;
  }
`;
