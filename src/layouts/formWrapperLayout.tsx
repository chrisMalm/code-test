import { NavLink, Outlet } from "react-router-dom";

const FormWrapperLayout = () => {
  return (
    <div className="help-layout">
      <h1>Form section</h1>
      <p>
        Här visas två olika sätt att hantera formulär i React:
        <br />
        <strong>Register-form</strong> använder inbyggda HTML-fält direkt med{" "}
        <code>register()</code>.
        <br />
        <strong>Controller-form</strong> används när du jobbar med
        komponentbibliotek som MUI, där <code>register()</code> inte fungerar
        direkt. <br />
        ✅ register() = bäst för vanliga HTML-fält. <br />✅ Controller = bäst
        för komponentbibliotek (som MUI, Chakra, etc.).
      </p>
      <nav>
        <NavLink to="register-form">Register-form</NavLink>
        <NavLink to="controller-form">Controller-form</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default FormWrapperLayout;
