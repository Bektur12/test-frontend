import React, { useEffect } from "react";
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
import { useSnackbar } from "../../hooks/useSnackBar";
import { Snackbar } from "../UI/Snackbar/SnackBar";
import { unwrapResult } from "@reduxjs/toolkit";

export const Flats = () => {
  const dispatch = useDispatch();
  const { notify } = useSnackbar();

  const options = [
    {
      onClick: (id) => {
        handleDeleteFlat(id);
      },
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
      Header: "Номер клиента",
      accessor: "clientNumber",
    },
    {
      id: "2",
      Header: "Обьект",
      accessor: "object",
    },
    {
      id: "4",
      Header: "Этаж",
      accessor: "floor",
    },
    {
      id: "8",
      Header: "Цена",
      accessor: "price",
    },
    {
      Header: "Клиент",
      accessor: "fullName",
      id: "fullName",
    },
    {
      Header: "№ квартиры",
      accessor: "contractNumber",
      id: "contractNumber",
    },

    {
      Header: "Статус",
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

  const { EDIT, OPEN_DRAWER, TABS, status } = Object.fromEntries(params);

  const handleEdit = (id) => setParams({ id, EDIT: true });

  const { flats } = useSelector((state) => state.flats);

  const handleDeleteFlat = (id) => {
    dispatch(deleteFlat({ id, notify }))
      .then(unwrapResult)
      .then(() => dispatch(getFlats({ title: TABS, status })));
  };

  useEffect(() => {
    dispatch(getFlats({ title: TABS, status }));
  }, [TABS, status]);

  const handleFilteredByTitle = (title) => {
    setParams({ TABS: title });
  };

  const handleIsVisibleDrawer = () => setParams({ OPEN_DRAWER: true });

  const items = [
    {
      label: "Все",
      key: "1",
      children: <Table columns={columns} data={flats} />,
    },
    {
      label: "Prime City",
      key: "2",
      children: <Table columns={columns} data={flats} />,
    },
    {
      label: "Kochmon City",
      key: "3",
      children: <Table columns={columns} data={flats} />,
    },
    {
      label: "Baytik",
      key: "4",
      children: <Table columns={columns} data={flats} />,
    },
  ];

  const handleCloseDrawer = () => setParams({});

  return (
    <Container>
      <Snackbar />
      <FlatsEditDrawer open={EDIT} onClose={handleCloseDrawer} />
      <FlatsAddDrawer open={OPEN_DRAWER} onClose={handleCloseDrawer} />
      <Tabs
        items={items}
        onClick={handleIsVisibleDrawer}
        filtered={handleFilteredByTitle}
      />
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
