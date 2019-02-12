import React from "react";

const SearchBox = ({ name, value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      name={name}
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      type="text"
      placeholder="Search Movie"
    />
  );
};

export default SearchBox;
