import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/logout/logoutSlice";
import { User } from "../store/users/usersType";

type NavbarProps = {
  me: User | null;
};

const Navbar = ({ me }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state: boolean) => () => setOpen(state);
  const dispatch = useAppDispatch();

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
        {/* <NavLink to="/forms">Forms</NavLink> */}
        {/* <NavLink to="/Transactions">Transactions</NavLink> */}
        {/* <NavLink to="/filters">Filters</NavLink> */}
        {/* <NavLink to="/Pagination">Pagination</NavLink> */}
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
    <nav className="flex">
      <h1 className="p-2 text-xl font-bold mr-auto border-b-2 border-b-[#bc4123]">
        chrisMalm
      </h1>

      {/* Desktop links */}
      <div className="hidden lg:flex gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Home
        </NavLink>
        {me && (
          <NavLink
            to="/Protected"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Protected
          </NavLink>
        )}
        {me && (
          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              `${
                isActive ? "nav-link-active" : "nav-link"
              } flex items-center gap-1`
            }
          >
            <AccountBoxIcon /> Profile
          </NavLink>
        )}
        {!me && (
          <NavLink
            to="/Login"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden">
        <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
