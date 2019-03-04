import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import Genre from "./genre";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchField: "",
    sortColumn: { path: "title", order: "asc" },
    currentGenre: null
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This post has been already deleted");

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentGenre: genre, searchField: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchField: query, currentPage: 1, currentGenre: null });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      sortColumn,
      searchField,
      currentGenre
    } = this.state;

    let filteredMovies = allMovies;

    if (searchField)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchField.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === currentGenre._id);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { user } = this.props;

    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      sortColumn,
      currentGenre,
      searchField
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
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <h5 className="m-2">
            {allMovies.length > 0 &&
              `Showing ${totalCount} movies in the database`}
          </h5>
          <SearchBox
            name="searchField"
            value={searchField}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
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
