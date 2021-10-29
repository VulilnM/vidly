import React, { Component } from "react";
import { getMovies, deleteMovie } from "../moveDB/fakeMovieService";
import { getGenres } from "../moveDB/fakeGenreService.js";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./common/moviesTable";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currPage: 1,
    sortColumn: {path: 'title', order: 'asc'},

  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
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
    this.setState({ selectedGenre: genre, currPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  getPagedData(){
    const { pageSize, currPage, selectedGenre, movies: allMovies, sortColumn } = this.state;
    const filtered =
    selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const paginatedMovies = paginate(sorted, currPage, pageSize);

    return {totalCount: filtered.length, data: paginatedMovies}
  }

  render() {
    const count = this.state.movies.length;
    const { pageSize, currPage, sortColumn } = this.state;

    if (count === 0) return <h1>No movies in the database.</h1>;

    const result = this.getPagedData();

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
            <h1>Showing {result.totalCount} movies in the database.</h1>
            
            <MoviesTable
              movies={this.getPagedData.data}
              sortColumn={sortColumn}
              onDelete={this.handleDeleteButton}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={this.getPagedData().totalCount}
              currPage={currPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
