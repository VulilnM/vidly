import React, { Component } from "react";
import { getMovies, deleteMovie } from "../moveDB/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleLike = (movie) => {
    const movies = [... this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({movies});
  };

  handleDeleteButton = (movie) => {
    const { movies } = this.state;
    movies.splice(movies.indexOf(deleteMovie(movie)), 1);
    this.setState({ movies });
  };

  render() {
    return (
      <>
        {this.state.movies.length === 0 ? (
          <h1>No movies in database </h1>
        ) : (
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
                {this.state.movies.map((movie) => (
                  <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like onClick={() => this.handleLike(movie)} liked={movie.liked} />
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
          </>
        )}
      </>
    );
  }
}

export default Movies;
