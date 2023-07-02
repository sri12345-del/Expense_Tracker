import { Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Mainheader.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { expenseaction } from "../store/Expenststore";
import { useHistory } from "react-router-dom";
import { themeaction } from "../store/themereducer";
import { authaction } from "../store/Authstore";

const Mainheader = () => {

  const history=useHistory()

  const looged = useSelector(state => state.auth.loogedin)
  const amount = useSelector(state => state.expense.amount)
  console.log(amount)
  const dispatch=useDispatch()
  const darkmode = () => {
    dispatch(expenseaction.darkhandler())
  }

  const logouthandler = () => {
    history.replace("/auth")
    localStorage.removeItem("key")
    localStorage.removeItem("idToken")
    dispatch(authaction.removetoken())
  }

  const changehandler = () => {
    dispatch(themeaction.themehandler())
  }
  return (
        <header className={classes.header}>
        <h1>Expense tracker</h1>
        <nav>
          <ul>
            <li>{looged && <NavLink to="/auth">Login</NavLink>}</li>
            <li>{looged && <NavLink to="/home">Home</NavLink>}</li>
            <li>
              {looged && (
                <NavLink to="/addexpense">AddExpense</NavLink>
              )}
          </li>
          {localStorage.getItem("key") && <Button onClick={logouthandler}>Logout</Button>}
          <Button onClick={changehandler}>Theme</Button>
            {looged && amount >= 10000 && <li><Button onClick={darkmode}>Active Premium</Button></li>}
          </ul>
          </nav>
          </header>
  );
};

export default Mainheader;
