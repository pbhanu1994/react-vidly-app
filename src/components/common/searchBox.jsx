import React from "react";

const SearchBox = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      className="form-control my-3"
      name={name}
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      type="text"
      placeholder={`Search ${placeholder}`}
    />
  );
};

export default SearchBox;
