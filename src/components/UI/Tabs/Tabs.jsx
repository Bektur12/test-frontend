import { Tabs as AntTabs } from "antd";
import { styled } from "styled-components";
import { Button } from "../Button/Button";
import { FILTER_OPTION } from "../../../utils/consts";
import { Filtered } from "../Filtered/Filtered";
export const Tabs = ({ items, onClick, filtered }) => {
  const handleTabClick = (key) => {
    const selectedTab = items.find((item) => item.key === key);
    filtered(selectedTab.label);
  };

  const renderTabBar = (props, DefaultTabBar) => {
    return (
      <div className="tabs">
        <InnerWrapper>
          <DefaultTabBar {...props} />
          <Button backgroundColor="#D1F4D9" onClick={onClick}>
            Добавить
          </Button>
        </InnerWrapper>
        <Filtered title={"Фильтр"} items={FILTER_OPTION} />
      </div>
    );
  };

  return (
    <>
      <TabsStyled
        defaultActiveKey="1"
        renderTabBar={renderTabBar}
        items={items}
        onTabClick={handleTabClick}
      />
    </>
  );
};

const TabsStyled = styled(AntTabs)`
  .tabs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const InnerWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
`;
