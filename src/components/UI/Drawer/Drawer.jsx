import { Drawer as AntDrawer } from "antd";
import { styled } from "styled-components";

const ReusableDrawer = ({ title, placement, children, open, onClose }) => {
  return (
    <>
      <DrawerStyled
        title={title}
        placement={placement}
        onClose={onClose}
        open={open}
      >
        {children}
      </DrawerStyled>
    </>
  );
};

export default ReusableDrawer;

const DrawerStyled = styled(AntDrawer)`
  .ant-drawer-header {
    background-color: #f4faff;
  }
`;
