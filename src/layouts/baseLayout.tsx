import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box, Button, Divider, Drawer, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { clearFirstInit } from "../store/singup/signupSlice";
import { getLoggedInUser } from "../store/getloggedInUser/getLoggedInUserSlice";
import { logoutUser } from "../store/logout/logoutSlice";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";

const BaseLayout = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { firstInit, user } = useAppSelector((state) => state.signup);
  const { me } = useAppSelector((state) => state.me);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (firstInit && user) {
      setSnackbarOpen(true);
    }
  }, [firstInit, user]);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [location.pathname, dispatch]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearFirstInit());
  };

  const handleLogout = () => {
    console.log("hgej");

    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        try {
          console.log(res, "response frontend");
          window.location.href = "/";
        } catch (error) {
          console.log(error, "err");
        }
      });
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ color: "black", padding: "1rem" }} className="AAA">
        {me?.name}
      </Box>
      <Divider />
      <Button
        onClick={() => handleLogout()}
        color="error"
        variant="outlined"
        sx={{ padding: "0.5rem", margin: "1rem 0 0 1rem" }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>codeTest</h1>
          <NavLink style={{ marginTop: "1.8px" }} to="/">
            Home
          </NavLink>
          <NavLink style={{ marginTop: "1.8px" }} to="forms">
            Forms
          </NavLink>
          <NavLink style={{ marginTop: "1.8px" }} to="Transactions">
            Transactions
          </NavLink>
          <NavLink style={{ marginTop: "1.8px" }} to="filters">
            Filters
          </NavLink>
          <NavLink style={{ marginTop: "1.8px" }} to="Pagination">
            Pagination
          </NavLink>
          {me && <NavLink to="Protected">Protected</NavLink>}
          {me ? (
            <Box>
              <IconButton onClick={toggleDrawer(true)} aria-label="delete">
                <Box sx={{ fontSize: "1rem" }}>Profile</Box> <AccountBoxIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Box>
          ) : (
            <NavLink to="Login">Login</NavLink>
          )}
        </nav>
      </header>
      <main>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={`Welcome ${user?.name}`}
        />
        <Outlet />
      </main>
      <footer>Copyright 2025</footer>
    </div>
  );
};

export default BaseLayout;
