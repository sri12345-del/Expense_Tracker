import { Route, Redirect, useHistory } from "react-router-dom";
import Login from "./pages/Auth";
import Home from "./pages/Home";
import Layout from "./layout/layout";
import AddExpense from "./pages/Addexpense";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseaction } from "./store/Expenststore";
import axios from "axios";

let inital = true;
function App() {
  const looged = useSelector((state) => state.auth.loogedin);
  const expense = useSelector((state) => state.expense);
  console.log(expense.item)
  const dispatch = useDispatch();
  useEffect(() => {
    if (inital) {
      inital = false;
      return;
    }
    axios
      .put(
        "https://react-http-735b2-default-rtdb.firebaseio.com/expense.json",
        JSON.stringify(expense.item)
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }, [expense]);

  useEffect(() => {
    axios.get("https://react-http-735b2-default-rtdb.firebaseio.com/expense.json")
      .then((res) => {
        if (res.data) {
          res.data.map((item) => dispatch(expenseaction.Addfromform(item)));
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <Layout>
      <Route path="/auth">
        <Login></Login>
      </Route>
      {looged && (
        <Route path="/home">
          <Home></Home>
        </Route>
      )}
      {looged && (
        <Route path="/addexpense">
          {looged && <AddExpense style={{}}></AddExpense>}
        </Route>
      )}
      <Route path="*">
        <Redirect to="/auth"></Redirect>
      </Route>
    </Layout>
  );
}

export default App;
