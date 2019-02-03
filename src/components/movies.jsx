import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import Genre from "./genre";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    currentGenre: null
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteMovie = movieId => {
    const movies = this.state.movies.filter(m => m._id !== movieId);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(`Page: ${page}`);
    this.setState({ currentPage: page });
  };

  handleGenreList = genre => {
    console.log("Genre: ", genre.name);
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      sortColumn,
      currentGenre
    } = this.state;

    const filteredMovies =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      sortColumn,
      currentGenre
    } = this.state;

    const count = allMovies.length;

    if (count === 0) return <h5>There are no movies found</h5>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2">
          <Genre
            genreList={genres}
            onGenreSelect={this.handleGenreList}
            currentGenre={currentGenre}
          />
        </div>
        <div className="col">
          <h5 className="m-2">
            {allMovies.length > 0 &&
              `Showing ${totalCount} movies in the database`}
          </h5>
          <MoviesTable
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.deleteMovie}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
