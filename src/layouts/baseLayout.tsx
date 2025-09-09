import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { clearFirstInit } from "../store/singup/signupSlice";
import { getLoggedInUser } from "../store/getloggedInUser/getLoggedInUserSlice";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  const { firstInit, user } = useAppSelector((state) => state.signup);
  const { me } = useAppSelector((state) => state.me);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (firstInit && user) setSnackbarOpen(true);
  }, [firstInit, user]);

  useEffect(() => {
    console.log("hej");

    dispatch(getLoggedInUser());
  }, [location.pathname, dispatch]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearFirstInit());
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-headerNav/80 backdrop-blur-md sticky top-0 p-5 z-50">
        <Navbar me={me} />
      </header>

      <main className="flex-1 mx-auto w-full max-w-[1200px] p-8 xl:px-0 py-8">
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
