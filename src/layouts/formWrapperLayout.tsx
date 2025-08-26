import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const FormWrapperLayout = () => {
  return (
    <Box className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-8 text-center">Form section</h1>
        <p className="mb-16 flex flex-col justify-self-center">
          Här visas två olika sätt att hantera formulär i React:
          <br />
          <strong>Register-form</strong> Använder inbyggda HTML-fält direkt med
          <code>register()</code>
          <br />
          <strong>Controller-form</strong> Används när du jobbar med
          komponentbibliotek som MUI, där register() inte fungerar direkt.
          <br />
          ✅ register() = bäst för vanliga HTML-fält.
          <br />✅ Controller = bäst för komponentbibliotek (som MUI, Chakra,
          etc.).
        </p>

        <nav className="flex justify-center gap-4 mb-6">
          <NavLink
            className={({ isActive }) =>
              `px-4 py-2 rounded-sm font-medium ${
                isActive
                  ? "bg-[#bc4123] text-white"
                  : "bg-gray-200 text-gray-800"
              }`
            }
            to="register-form"
          >
            Register-form
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-4 py-2 rounded-sm font-medium ${
                isActive
                  ? "bg-[#bc4123] text-white"
                  : "bg-gray-200 text-gray-800"
              }`
            }
            to="controller-form"
          >
            Controller-form
          </NavLink>
        </nav>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </Box>
  );
};

export default FormWrapperLayout;
