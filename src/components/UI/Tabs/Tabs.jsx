import React from "react";
import { Tabs as AntTabs } from "antd";
import { styled } from "styled-components";
import { Button } from "../Button/Button";

export const Tabs = ({ items, onClick }) => {
  const renderTabBar = (props, DefaultTabBar) => (
    <div className="tabs">
      <DefaultTabBar {...props} />
      <Button backgroundColor="#D1F4D9" onClick={onClick}>
        Добавить
      </Button>
    </div>
  );

  return (
    <TabsStyled
      defaultActiveKey="1"
      renderTabBar={renderTabBar}
      items={items}
    />
  );
};

const TabsStyled = styled(AntTabs)`
  .tabs {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
