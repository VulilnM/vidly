import React, { Component } from "react";
import Like from "./like";
import Table from "./table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      )),
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
     <Table 
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
     />
    );
  }
}

export default MoviesTable;
