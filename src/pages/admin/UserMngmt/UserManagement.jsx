import React, { useEffect, useState, forwardRef } from "react";
import "./UserManagement.css";
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
import axios from "../../../backend/axios";

// for remove dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const headCells = [
  { id: "uid", numeric: false, disablePadding: false, label: "User ID" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "role", numeric: false, disablePadding: false, label: "Role" },
  { id: "date", numeric: false, disablePadding: false, label: "Date Joined" },
  {
    id: "action",
    numeric: false,
    disableSorting: true,
    disablePadding: false,
    label: "",
  },
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserManagement() {
  const [users, setUsers] = useState([]); // State for user data
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("uid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [toDelete, setToDelete] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/getUser.php");
      setUsers(response.data); // Update state with API data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedUsers = [...users].sort((a, b) =>
    order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy])
  );

  const visibleRows = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const deleteUser = () => {
    axios.post("/deleteUser.php", { uid: toDelete }).then((res) => {
      alert("User deleted successfully!");
      fetchUsers();
      setRemoveDialog(false);
    });
  };

  let closeRemove = () => {
    setRemoveDialog(false);
  };

  let openRemove = (uid) => {
    setToDelete(uid);
    setRemoveDialog(true);
  };

  return (
    <div>
      <AdminNav active={location.pathname} />
      <section
        className="container p-0 mt-5"
        inert={removeDialog ? "true" : undefined}
      >
        <div className="user-management-container">
          <h2>User Management</h2>
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
                rowCount={users.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((user, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={user.uid}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {user.uid}
                    </TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">{user.date_created}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{ backgroundColor: "#e53b3b" }}
                          onClick={() => openRemove(user.uid)}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {page > 0 && (
                  <TableRow
                    style={{ height: 53 * (rowsPerPage - visibleRows.length) }}
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </Paper>
        </div>
        {/* remove dialog */}
        <Dialog
          open={removeDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeRemove}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete User?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you want to delete this user no. {toDelete} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRemove} sx={{ color: "#e53b3b" }}>
              Disagree
            </Button>
            <Button onClick={deleteUser}>Agree</Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
}

export default UserManagement;
