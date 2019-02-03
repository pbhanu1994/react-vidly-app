import React from "react";

const Genre = ({
  genreList,
  currentGenre,
  textProperty,
  valueProperty,
  onGenreSelect
}) => {
  return (
    <ul className="list-group">
      {genreList.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Genre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Genre;
