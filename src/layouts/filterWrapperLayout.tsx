import { NavLink, Outlet } from "react-router-dom";

const FilterWrapperLayout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-center">Filter section</h1>
      <h2>
        Använder en Json-server för att hämta data från en json fil. Npm run
        transaction för att testa.
      </h2>
      <h2 className="mb-16">
        Använder en Json-server för att hämta data från en json fil. Npm run
        multifilter för att testa.
      </h2>
      <nav className="flex justify-center gap-4 mb-6">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 rounded-sm font-medium ${
              isActive ? "bg-[#bc4123] text-white" : "bg-gray-200 text-gray-800"
            }`
          }
          to="transaction-filter"
        >
          transaction-filter
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 rounded-sm font-medium ${
              isActive ? "bg-[#bc4123] text-white" : "bg-gray-200 text-gray-800"
            }`
          }
          to="multi-filter"
        >
          multi-filter
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default FilterWrapperLayout;
