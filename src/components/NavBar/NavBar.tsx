import { NavLink } from "react-router-dom";
import todos from "../../store/todos";
import { observer } from "mobx-react-lite";

import "./NavBar.css";
type Props = {
  name: string;
  setName: (name: string) => void;
};

export const NavBar=observer(({ name, setName }: Props)=> {
  const logout =  () => {
    todos.logout()
  };

  return (
    <ul className="topnav">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <div className="topnav2">
        {todos.isAuth ? (
          <li>
            <NavLink to="/login" onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </div>
    </ul>
  );
})
