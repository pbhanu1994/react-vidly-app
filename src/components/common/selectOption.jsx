import React from "react";

const Select = ({ name, label, list, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} {...rest} className="form-control" id={name}>
        <option value="" />
        {list.map(listOption => (
          <option key={listOption._id} value={listOption._id}>
            {listOption.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
