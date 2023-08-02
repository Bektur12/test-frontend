import React, { useEffect, useState } from "react";
import { CustomStatus } from "../UI/CustomStatus";
import { Button } from "antd";
import { Table } from "../UI/Table/Table";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFlat, getFlats } from "../../store/actions/flats";
import { styled } from "styled-components";
import { FlatsAddDrawer } from "./FlatsAddDrawer";
import { FlatsEditDrawer } from "./FlatsEditDrawer";
import { Menu } from "../UI/Menu/Menu";

export const Flats = () => {
  const dispatch = useDispatch();

  const options = [
    {
      onClick: (id) => dispatch(deleteFlat(id)),
      value: "Удалить",
    },
    {
      onClick: () => {},
      value: "История",
    },
  ];
  const columns = [
    {
      id: "clientNumber",
      Header: "clientNumber",
      accessor: "clientNumber",
    },
    {
      Header: "fullName",
      accessor: "fullName",
      id: "fullName",
    },
    {
      Header: "contractNumber",
      accessor: "contractNumber",
      id: "contractNumber",
    },

    {
      Header: "status",
      accessor: (rowData) => rowData.status,
      id: "status",
      Cell: ({ value: status }) => <CustomStatus status={status} />,
    },
    {
      id: "id",
      Header: "",
      accessor: (rowData) => rowData.id,
      Cell: ({ value: id }) => (
        <ButtonContainer>
          <Button onClick={() => handleEdit(id)}>Изменить</Button>
          <Menu items={options} id={id} />
        </ButtonContainer>
      ),
    },
  ];

  const [params, setParams] = useSearchParams();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const handleEdit = (id) => {
    setParams({ id, isVisible: true });
  };
  const { flats } = useSelector((state) => state.flats);

  useEffect(() => {
    dispatch(getFlats());
  }, []);

  const handleIsVisibleDrawer = () => {
    setIsVisibleDrawer((prev) => !prev);
  };

  const openDrawer = params.get("isVisible");

  return (
    <Container>
      <FlatsEditDrawer open={openDrawer} onClose={() => setParams({})} />

      <FlatsAddDrawer open={isVisibleDrawer} onClose={setIsVisibleDrawer} />
      <TopPart>
        <Button onClick={handleIsVisibleDrawer}>Добавить</Button>
      </TopPart>
      <Table columns={columns} data={flats} />
    </Container>
  );
};

const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const TopPart = styled("div")`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;
