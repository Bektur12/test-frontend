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
  width: 64px;
  height: 26px;
  border-radius: 5px;
  text-align: center;
`;
