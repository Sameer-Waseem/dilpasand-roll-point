function getOrderBy(value) {
  let sortingName;
  let sortingDirection;

  switch (value) {
    case "name_asc":
      sortingName = "name";
      sortingDirection = 1;
      break;

    case "name_desc":
      sortingName = "name";
      sortingDirection = -1;
      break;

    case "price_asc":
      sortingName = "price";
      sortingDirection = 1;
      break;

    case "price_desc":
      sortingName = "price";
      sortingDirection = -1;
      break;
  }

  return { sortingName, sortingDirection };
}

module.exports = getOrderBy;
