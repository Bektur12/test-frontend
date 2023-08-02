import React from "react";
import { usePagination, useTable } from "react-table";
import styled from "styled-components";

export const Table = ({ columns = [], data = [] }) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 100 },
      },
      usePagination
    );

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TH {...column.getHeaderProps()}>{column.render("Header")}</TH>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={Math.random()}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled("table")`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  border-spacing: 0 5px;

  & th {
    background-color: #ececec;
    color: 001737;
    text-transform: capitalize;
  }

  & thead {
    border-spacing: 0 14px;
  }
  & thead::after {
    content: "";
    display: table-row;
    height: 14px;
  }
  & tr {
    border: 1px solid black;
  }
  tbody {
    tr {
      margin-bottom: 10px;
      width: 100%;
    }
  }
`;

const TD = styled("td")`
  padding: 8px;
`;

const TH = styled("th")`
  padding: 8px;
  background-color: white;
`;
