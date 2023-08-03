import { styled } from "styled-components";

export const CustomStatus = ({ status }) => {
  const statusChangeColors = (newStatus) => {
    switch (newStatus) {
      case "Активна":
        return "#CEDEFC";

      case "Куплено":
        return "#D4FCCE";

      case "Бронь":
        return "#FCECCE";

      default:
        break;
    }
  };
  return (
    <StatusWrapper status={statusChangeColors(status)}>{status}</StatusWrapper>
  );
};

const StatusWrapper = styled("div")`
  background: ${(p) => p.status};
  border-radius: 5px;
  padding: 6px 0px 6px 0px;
  display: flex;
  justify-content: center;
`;
