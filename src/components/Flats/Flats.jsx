import React, { useEffect, useState } from "react";
import { CustomStatus } from "../UI/CustomStatus";
import { Table } from "../UI/Table/Table";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFlat, getFlats } from "../../store/actions/flats";
import { styled } from "styled-components";
import { FlatsAddDrawer } from "./FlatsAddDrawer";
import { FlatsEditDrawer } from "./FlatsEditDrawer";
import { Menu } from "../UI/Menu/Menu";
import { Button } from "../UI/Button/Button";
import { Tabs } from "../UI/Tabs/Tabs";

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

  const handleEdit = (id) => setParams({ id, isVisible: true });

  const { flats } = useSelector((state) => state.flats);

  useEffect(() => {
    dispatch(getFlats());
  }, []);

  const handleIsVisibleDrawer = () => {
    setIsVisibleDrawer((prev) => !prev);
  };

  const openDrawer = params.get("isVisible");

  const items = [
    {
      label: "Все",
      key: "1",
      children: `Content of Tab Pane ${"d"}`,
    },
    {
      label: "Prime City",
      key: "2",
      children: <Table columns={columns} data={flats} />,
    },
    {
      label: "Kochmon City",
      key: "3",
      children: `Content of Tab Pane ${"d"}`,
    },
    {
      label: "Baytik",
      key: "4",
      children: `Content of Tab Pane ${"d"}`,
    },
    {
      label: "Prime City",
      key: "5",
      children: `Content of Tab Pane ${"d"}`,
    },
  ];
  return (
    <Container>
      <FlatsEditDrawer open={openDrawer} onClose={() => setParams({})} />
      <FlatsAddDrawer open={isVisibleDrawer} onClose={setIsVisibleDrawer} />

      <Tabs items={items} onClick={handleIsVisibleDrawer} />
    </Container>
  );
};

const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
  height: 100%;
`;
