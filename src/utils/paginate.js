import _ from "lodash";

export function paginate(movieItems, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(movieItems)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
