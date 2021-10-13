const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const getData = (data, pagination, order, orderBy, page, rowsPerPage) => {
  let sortedData = stableSort(data, getComparator(order, orderBy));
  if (pagination) {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    return sortedData;
  }
};

const createField = (data, ignoreCell) => {
  let fields = [];
  data &&
    Object.keys(data).map((key) => {
      if (!ignoreCell.includes(key)) {
        let obj = {
          name: key,
          placeholder: key,
          type: typeof data[key],
          required: true,
          label: key,
        };
        fields.push(obj);
      }
    });
  return fields;
};

const createInitialValues = (data, ignoreCell, update) => {
  let initialValues = {};
  data &&
    Object.keys(data).map((key) => {
      if (!ignoreCell.includes(key)) {
        initialValues[key] = update ? data[key] : "";
      }
    });
  return initialValues;
};

export { getData, createField, createInitialValues };
