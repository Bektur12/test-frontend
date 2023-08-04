import React, { useEffect, useState } from "react";
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
import { Modal } from "../UI/Modal/Modal";
import { Button } from "../UI/Button/Button";
import { getFormatDate } from "../../utils/helpers";

export const Manager = () => {
  const [params, setParams] = useSearchParams();

  const { notify } = useSnackbar();

  const dispatch = useDispatch();

  const handleEdit = (id) => setParams({ id, isVisible: true });

  const handleIsShowModal = (id) => {
    setParams({ OPEN_MODAL: true, id });
  };

  const options = [
    {
      onClick: (id) => {
        handleIsShowModal(id);
      },
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
      id: "2",
      Header: "Почта",
      accessor: "email",
    },

    {
      Header: "Телефон",
      accessor: "phone",
      id: "phone",
    },
    {
      Header: "Дата создания",
      accessor: "creationDate",
      id: "4",
      Cell: ({ value }) => getFormatDate(value),
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

  const { OPEN_MODAL, id, isVisible } = Object.fromEntries(params);

  const onHandleDeleteClick = () => {
    dispatch(deleteManager({ id, notify }));
    setParams({});
  };

  return (
    <Container>
      <Snackbar />
      <Modal
        open={OPEN_MODAL}
        title={"Вы действительно хотите удалить менеджера?"}
        okDelete={onHandleDeleteClick}
        onClose={setParams}
      />
      <ManagerEditDrawer open={isVisible} onClose={() => setParams({})} />

      <ManagerAddDrawer open={isVisibleDrawer} onClose={setIsVisibleDrawer} />
      <TopPart>
        <Button backgroundColor="#D1F4D9" onClick={handleIsVisibleDrawer}>
          Добавить
        </Button>
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
