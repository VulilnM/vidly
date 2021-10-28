import React, { Component } from "react";
import { getMovies, deleteMovie } from "../moveDB/fakeMovieService";
import { getGenres } from '../moveDB/fakeGenreService.js'
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup"
import MoviesTable from "./common/moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currPage: 1,
  };

  componentDidMount() {
    const genres = [{ name: "All genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    })
  }

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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currPage: 1 })
  }
  render() {
    const count = this.state.movies.length;
    const { pageSize, currPage, selectedGenre, movies } = this.state;

    if (count === 0) return <h1>No movies in the database.</h1>;

    const filtered = selectedGenre && selectedGenre._id ?
      movies.filter(m => m.genre._id === selectedGenre._id)
      : movies

    let paginatedMovies = paginate(filtered, currPage, pageSize);


    return (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h1>Showing {filtered.length} movies in the database.</h1>

            <MoviesTable
              movies={movies}
              onDelete={this.handleDeleteButton}
              onLike={this.handleLike} />

            <Pagination
              itemsCount={filtered.length}
              currPage={currPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Movies;