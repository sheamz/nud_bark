import React, { useEffect, useState, forwardRef } from "react";
import "./PostMngmt.css";
import AdminNav from "../AdminNav";

import EnhancedTableHead from "../../../components/MuiDataTables/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "../../../backend/axios";

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostMngmt() {
  let active = location.pathname;
  const [rows, setRows] = useState([]);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("pid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getPost();
  }, []);

  let getPost = () => {
    axios
      .get("/getPost.php")
      .then((res) => {
        setRows(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  let closeRemove = () => {
    setRemoveDialog(false);
  };
  let openRemove = (pid) => {
    setToDelete(pid);
    setRemoveDialog(true);
  };

  let deletePost = () => {
    axios
      .post("/deletePost.php", { pid: toDelete })
      .then((res) => {
        getPost();
        setRemoveDialog(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
                      <TableCell align="left">{row.tit}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.com}</TableCell>
                      <TableCell align="left">{row.views}</TableCell>
                      <TableCell align="left">
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => openRemove(row.pid)}
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

        <Dialog
          open={removeDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeRemove}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete Post?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you want to delete this post no. {toDelete} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRemove} sx={{ color: "#e53b3b" }}>
              Disagree
            </Button>
            <Button onClick={deletePost}>Agree</Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
}

export default PostMngmt;
