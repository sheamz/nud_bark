import React, { useState } from "react";
// import { FiMenu } from "react-icons/fi"; // Import hamburger menu icon
import "./PostMngmt.css";
import AdminNav from "../AdminNav";

//imports for data table
import EnhancedTableHead from "../../../components/MuiDataTables/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const rows = [
  {
    pid: "pst-1000",
    title: "Barado nanamn urinal?",
    com: 109,
    view: 348,
    date: "12-04-2024",
  },
  {
    pid: "pst-1002",
    title: "LF: upuan sa canten",
    com: 20,
    view: 67,
    date: "12-04-2024",
  },
  {
    pid: "pst-1003",
    title: "LF: Study buddy",
    com: 0,
    view: 3,
    date: "12-04-2024",
  },
  {
    pid: "pst-1004",
    title: "Prof namen missing in action",
    com: 9,
    view: 4042,
    date: "12-04-2024",
  },
  {
    pid: "pst-1005",
    title: "May nakita po ba kayong wallet sa cr ng boys?",
    com: 109,
    view: 348,
    date: "12-04-2024",
  },
  {
    pid: "pst-1006",
    title: "wala na ako masiisp?",
    com: 109,
    view: 348,
    date: "12-04-2024",
  },
];

// sorting mui data table
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// headers
const headCells = [
  {
    id: "pid",
    numeric: false,
    disablePadding: false,
    label: "Post ID",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date Posted",
  },
  {
    id: "com",
    numeric: true,
    disablePadding: false,
    label: "Comments",
  },
  {
    id: "view",
    numeric: true,
    disablePadding: false,
    label: "Views",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function PostMngmt() {
  let active = location.pathname;

  // Enhanced Table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div>
      <AdminNav active={active} />
      <section className="container mt-5 p-0">
        <div className="post-management-container">
          <h2>Post Management</h2>
          <Paper sx={{ width: "100%", mb: 2, mt: 5 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.pid}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                      >
                        {row.pid}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.com}</TableCell>
                      <TableCell align="left">{row.view}</TableCell>
                      <TableCell align="left">
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            disableElevation
                            style={{ backgroundColor: "#34418E" }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ backgroundColor: "#e53b3b" }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mui_pagination">
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </Paper>
        </div>
      </section>
    </div>
  );
}

export default PostMngmt;
