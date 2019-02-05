import React from "react";

const MovieForm = ({ match, history }) => {
  const { id } = match.params;
  return (
    <div>
      <h1>Movie Form {id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
