import { Modal as AntModal } from "antd";
import { styled } from "styled-components";
export const Modal = ({ open, onClose, title, okDelete }) => {
  return (
    <AntModalStyled
      onOk={okDelete}
      title={title}
      open={open}
      onCancel={() => onClose({})}
    />
  );
};

const AntModalStyled = styled(AntModal)`
  & .ant-modal-footer {
    text-align: center;
    margin-top: 20px;
  }
  & .ant-modal-title {
    text-align: center;
  }
  & .ant-modal-content {
    padding: 40px 24px;
  }
`;
