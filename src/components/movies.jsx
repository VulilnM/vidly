import React, { Component } from "react";
import { getMovies, deleteMovie } from "../moveDB/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currPage: 1,
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDeleteButton = (movie) => {
    const { movies } = this.state;
    movies.splice(movies.indexOf(deleteMovie(movie)), 1);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currPage, movies } = this.state;

    if (count === 0) return <h1>No movies in the database.</h1>;

    let paginatedMovies = paginate(movies, currPage, pageSize);

    return (
      <>
        <h1>Showing {this.state.movies.length} movies in the database.</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie) => (
              <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeleteButton(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          currPage={currPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Movies;
