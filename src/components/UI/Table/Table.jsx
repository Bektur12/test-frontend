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
  );
};

const StyledTable = styled("table")`
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0;
  font-family: Arial, sans-serif;

  & thead th {
    text-align: start;
  }
  & th {
    background-color: #f2f2f2;
    color: #001737;
    padding: 12px 16px;
    text-transform: capitalize;
    font-weight: bold;
    border-bottom: 2px solid #001737;
    vertical-align: middle;
  }

  & tr {
    border: 1px solid #d8d8d8;
  }

  & td {
    padding: 12px 16px;
    vertical-align: middle;
  }

  & tbody tr {
    margin-bottom: 10px;
    width: 100%;
  }

  & tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  & tbody tr:hover {
    background-color: #f0f0f0;
  }
`;

const TD = styled("td")`
  padding: 8px;
`;

const TH = styled("th")`
  padding: 8px;
  background-color: white;
`;
