import React, { Component } from "react";

class TableHeader extends Component {

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column =>{
      const { sortColumn } = this.props;
    if(column.path !== sortColumn.path) return null;
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc" style = { this.clickable }  ></i>;
    return <i className="fa fa-sort-desc" style = { this.clickable }> </i> ;
  };

  clickable =  { cursor: "pointer"};

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th style = { this.clickable } key={column.path || column.key} onClick={() => this.raiseSort(column.path)}> 
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead> 
    );
  }
}

export default TableHeader;
