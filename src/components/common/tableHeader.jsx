import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;

    return <i className="fa fa-sort-desc" />;
  };

  //   columns: Array
  // sortColumn: Object
  // onSort: function

  render() {
    const { columns, movies } = this.props;
    return (
      <thead style={{ display: movies.length === 0 && "none" }}>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
          <th />
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
