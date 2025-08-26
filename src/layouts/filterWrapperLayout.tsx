import { NavLink, Outlet } from "react-router-dom";

const FilterWrapperLayout = () => {
  return (
    <div className="filter-layout">
      <h1>Filter section</h1>

      <nav>
        <NavLink to="transaction-filter">transaction-filter</NavLink>
        <NavLink to="multi-filter">multi-filter</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default FilterWrapperLayout;
