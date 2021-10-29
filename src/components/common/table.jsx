import React from "react";
import TableHeader from "./tableheader";
import TableBody from "./tableBody";

const Table = (props) => {
  const {movies, columns, sortColumn, onSort} = props;
    return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default Table;
