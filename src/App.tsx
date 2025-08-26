import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import BaseLayout from "./layouts/baseLayout";
import NotFound from "./pages/NotFound";
import { store } from "./store/index";
import { Provider } from "react-redux";
import UserForm from "./components/RegisterForm";
import FormWrapperLayout from "./layouts/formWrapperLayout";
import ControllerForm from "./components/ControllerForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./MuiThemes/theme"; // importera ditt theme
import Transactions from "./pages/Transactions";
import FilterData from "./pages/FilterData";
import MultiFilterData from "./pages/MultiFilterData";
import Pagination from "./pages/Pagination";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedPage from "./pages/ProtectedPage";
import FilterWrapperLayout from "./layouts/filterWrapperLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forms" element={<FormWrapperLayout />}>
          <Route path="register-form" element={<UserForm />} />
          <Route path="controller-form" element={<ControllerForm />} />
        </Route>
        <Route path="/filters" element={<FilterWrapperLayout />}>
          <Route path="transaction-filter" element={<FilterData />} />
          <Route path="multi-filter" element={<MultiFilterData />} />
        </Route>
        <Route path="transactions" element={<Transactions />} />
        {/* <Route path="filterdata" element={<FilterData />} />
        <Route path="multifilterdata" element={<MultiFilterData />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="pagination" element={<Pagination />} />
        <Route path="/protected" element={<ProtectedPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
