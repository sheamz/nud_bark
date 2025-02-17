import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import axios from "../../../backend/axios";

//imports for data table
import EnhancedTableHead from "../../../components/MuiDataTables/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { faIR } from "@mui/material/locale";
//

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
    id: "Log ID",
    numeric: false,
    disablePadding: false,
    label: "Log ID",
  },
  {
    id: "User ID",
    numeric: false,
    disablePadding: false,
    label: "User ID",
  },
  {
    id: "Username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "time_of_log",
    numeric: false,
    disablePadding: false,
    label: "Time of Log",
  },
];

export default function Logs() {
  const [rows, setRows] = useState([]);

  // Enhanced Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("pid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    axios
      .get("/getLogs.php")
      .then((res) => {
        setRows(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

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
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <div>
      <AdminNav active="/logs" />
      <section className="container mt-5 p-0">
        <div className="logs-container" style={{ width: "100%" }}>
          <h2>Logs</h2>
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
                      key={row.lid}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                      >
                        {row.lid}
                      </TableCell>
                      <TableCell align="left">{row.uid ?? "--"}</TableCell>
                      <TableCell align="left">{row.username ?? "--"}</TableCell>
                      <TableCell align="left">{row.action}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{row.time_of_log}</TableCell>
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
                rowsPerPageOptions={[15, 20, 30]}
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
