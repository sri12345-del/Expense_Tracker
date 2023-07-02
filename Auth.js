import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authaction } from "../store/Authstore";
import classes from "./Auth.module.css";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [islogin, setislogin] = useState(false);
  const [formvalid, setformvalid] = useState(false);
  const [conformpassword, setconformpassword] = useState("");
  const [resetpassword, setresetpassword] = useState(false);
  const emailval = useRef();
  const passwordval = useRef();
  const resetemail = useRef();
  const changestate = (e) => {
    e.preventDefault();
    setislogin((preval) => !preval);
  };
  const conformhandler = async(e) => {
    const value = e.target.value;
    const email = emailval.current.value;
    const password = passwordval.current.value;
    setformvalid(
      email.includes("@") && password.length > 7 && value === password
    );
    setconformpassword(value);
  };
  const fetchhandler = async(e) => {
    e.preventDefault();
    const email = emailval.current.value;
    const password = passwordval.current.value;
    const obj={
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url;
    if (islogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM";
    }
    try {
      const res= await axios.post(url,obj)
      console.log(res.data);
      if (islogin) {
        dispatch(authaction.addtoken(res.data.idToken));
        localStorage.setItem("key", res.data.idToken);
        history.replace("/addexpense");
      } else {
        setislogin(true);
      }
    }
    catch (err) {
      console.log(err.message)
     } 

    emailval.current.value = "";
    passwordval.current.value = "";
    setconformpassword("");
  };

  const passwordreset = () => {
    setresetpassword(true);
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM",{
        requestType: "PASSWORD_RESET",
        email: resetemail.current.value,
      })
      console.log(res.data)
    }
    catch (err) {
      console.log(err.message)
    }
  };
  return (
    <Container>
      <Card className={classes.Card}>
        {!resetpassword && (
          <Form>
            {!islogin && <h2>Sign up</h2>}
            {islogin && <h2>Login</h2>}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                id="email"
                ref={emailval}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                id="password"
                ref={passwordval}
              ></Form.Control>
            </Form.Group>
            {!islogin && (
              <Form.Group>
                <Form.Label>Conform Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  id="name"
                  onChange={conformhandler}
                  value={conformpassword}
                ></Form.Control>
              </Form.Group>
            )}
            <br></br>
            <Button
              style={{ backgroundColor: formvalid ? "green" : "lightblue" }}
              size="sm"
              onClick={fetchhandler}
            >
              {islogin ? "login" : "signup"}
            </Button>
            <br></br>
            {islogin && <Button onClick={passwordreset} style={{margin:".5rem 30%"}} variant="link">Foget Password</Button>}
            <br></br>
            <Button onClick={changestate}>Have an account?login</Button>
          </Form>
        )}
        {resetpassword && (
          <div>
            <h2>Reset password</h2>
            <Form>
              <Form.Group>
                <Form.Label>Enter the email with which you regester</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  ref={resetemail}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={resetPasswordHandler}>
                Send link
              </Button>
            </Form>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Login;
