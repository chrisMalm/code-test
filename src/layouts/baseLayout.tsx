import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box, IconButton, Drawer, Snackbar, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { clearFirstInit } from "../store/singup/signupSlice";
import { getLoggedInUser } from "../store/getloggedInUser/getLoggedInUserSlice";
import { logoutUser } from "../store/logout/logoutSlice";

const BaseLayout = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state: boolean) => () => setOpen(state);

  const { firstInit, user } = useAppSelector((state) => state.signup);
  const { me } = useAppSelector((state) => state.me);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (firstInit && user) setSnackbarOpen(true);
  }, [firstInit, user]);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [location.pathname, dispatch]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearFirstInit());
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        window.location.href = "/";
      });
  };

  const DrawerList = (
    <Box
      className="bg-profileCard h-full text-white font-bold"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ padding: "1rem" }}>{me?.name}</Box>
      <Divider />
      <Box className="flex flex-col gap-4 p-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/forms">Forms</NavLink>
        <NavLink to="/Transactions">Transactions</NavLink>
        <NavLink to="/filters">Filters</NavLink>
        <NavLink to="/Pagination">Pagination</NavLink>
        {me && <NavLink to="/Protected">Protected</NavLink>}
        {me && (
          <NavLink to="/Profile" className="flex items-center gap-1">
            <AccountBoxIcon /> Profile
          </NavLink>
        )}
        {!me && <NavLink to="/Login">Login</NavLink>}
        {me && (
          <button
            className="font-bold text-white rounded-sm shadow hover:bg-red-600 transition"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        )}
      </Box>
    </Box>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="">
        <nav className="flex items-center justify-between">
          <h1 className="text-xl font-bold">codeTest</h1>

          {/* Desktop: visa bara navlinks, ingen profile/drawer */}
          <div className="hidden lg:flex gap-4 items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/forms">Forms</NavLink>
            <NavLink to="/Transactions">Transactions</NavLink>
            <NavLink to="/filters">Filters</NavLink>
            <NavLink to="/Pagination">Pagination</NavLink>
            {me && <NavLink to="/Protected">Protected</NavLink>}
            {me && (
              <NavLink to="/Profile" className="flex items-center gap-1">
                <AccountBoxIcon /> Profile
              </NavLink>
            )}
            {!me && <NavLink to="/Login">Login</NavLink>}
          </div>

          {/* Tablet/Small: Hamburger */}
          <div className="lg:hidden">
            <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </nav>
      </header>

      <main className="py-8 flex, flex-1 items-center justify-center">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={`Welcome ${user?.name}`}
        />
        <Outlet />
      </main>

      <footer className="text-center p-8 mt-auto">Copyright 2025</footer>
    </div>
  );
};

export default BaseLayout;
