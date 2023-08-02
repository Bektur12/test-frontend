import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Table } from "../UI/Table/Table";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { Menu } from "../UI/Menu/Menu";
import { ManagerAddDrawer } from "./ManagerAddDrawer";
import { ManagerEditDrawer } from "./ManagerEditDrawer";
import { deleteManager, getManagers } from "../../store/actions/managers";
import { Snackbar } from "../UI/Snackbar/SnackBar";
import { useSnackbar } from "../../hooks/useSnackBar";

export const Manager = () => {
  const [params, setParams] = useSearchParams();

  const { notify } = useSnackbar();

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    setParams({ id, isVisible: true });
  };

  const options = [
    {
      onClick: (id) => dispatch(deleteManager({ id, notify })),
      value: "Удалить",
    },
    {
      onClick: (id) => handleEdit(id),
      value: "Изменить",
    },
  ];
  const columns = [
    {
      Header: "ФИО",
      accessor: "fullName",
      id: "fullName",
    },
    {
      id: "email",
      Header: "email",
      accessor: "email",
    },

    {
      Header: "phone",
      accessor: "phone",
      id: "phone",
    },

    {
      id: "actions",
      Header: "",
      accessor: (rowData) => rowData.id,
      Cell: ({ value: id }) => (
        <ButtonContainer>
          <Menu items={options} id={id} />
        </ButtonContainer>
      ),
    },
  ];

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const { managers } = useSelector((state) => state.managers);

  useEffect(() => {
    dispatch(getManagers());
  }, []);

  const handleIsVisibleDrawer = () => {
    setIsVisibleDrawer((prev) => !prev);
  };

  const openDrawer = params.get("isVisible");

  return (
    <Container>
      <Snackbar />
      <ManagerEditDrawer open={openDrawer} onClose={() => setParams({})} />

      <ManagerAddDrawer open={isVisibleDrawer} onClose={setIsVisibleDrawer} />
      <TopPart>
        <Button onClick={handleIsVisibleDrawer}>Добавить</Button>
      </TopPart>
      <Table columns={columns} data={managers} />
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
