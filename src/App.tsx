import { Link, Outlet } from "react-router-dom";
import ThemeTesting from "./components/ThemeTesting/ThemeTesting";

const App = () => {
  return (
    <>
      <div>
        {/* <ThemeTesting /> */}
        {/* <Link to="/"> Home</Link> | <Link to="/login"> Login</Link> */}
        <Outlet />
      </div>
    </>
  );
};

export default App;
