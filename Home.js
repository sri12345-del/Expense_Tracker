import React, { useState, useEffect} from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

import classes from "./Home.module.css"
import axios from "axios";

const Home = () => {
    const [isshow, setisshow] = useState(false);
    const [name, setname] = useState("")
  const [photourl, setphotourl] = useState("")
  
  useEffect(() => {
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM", {
      idToken:localStorage.getItem("key")
    })
      .then(res => console.log(res))
    .catch(err=>console.log(err.message))
  },[])
    
      const namehandler = (e) => {
        setname(e.target.value)
    }
    const urlhandler = (e) => {
        setphotourl(e.target.value)
    }
  const updateprofile = () => {
    setisshow(true);
  };
  const closehandler = () => {
    setisshow(false)
  }
    const updatehandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("key")
        console.log(token)
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM", {
                idToken: token,
                displayName:name,
                photoUrl: photourl,
                deleteAttribute: null,
                returnSecureToken:true
            })
          .then(res =>console.log(res.data))
          .catch(err => console.log(err))
      setname("")
      setphotourl("")
    }
    const verifyemail = () => {
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCenENgt4LrLH79u1_uh-2mToo1R_OEeRM", {
          requestType:"VERIFY_EMAIL",
          idToken:localStorage.getItem("key")
            })
          .then(res => console.log(res.data))
          .catch(err => console.log(err.message))
    }
  return (
    <Container style={{textAlign:"center"}}>
    
      <Card className={classes.Card}>
        <div>
          <h1>Welcome to the Expense tracker</h1>
          <Button onClick={verifyemail}>Verify email id</Button>
      {!isshow && (
            <Card style={{ margin: "2rem 20rem", padding: "2rem 3rem", display: "flex" }}>
              <div>
          <div>your profile is incomplete.</div>
          <div><Button onClick={updateprofile}>Complete now</Button></div></div>
            </Card>
      )}</div>
      {isshow && (
        <Card style={{backgroundColor:"lightblue", margin:"2rem 20rem"}}>
          <div>
            <span><h1>Contect Details</h1></span>
          </div>
          <Form>
            <Form.Label>FullName</Form.Label>
            <Form.Control type="text" onChange={namehandler} value={name}></Form.Control>
            <Form.Label>Profile photo URL</Form.Label>
            <Form.Control type="text" onChange={urlhandler} value={photourl}></Form.Control>
            <Button onClick={updatehandler}>Update</Button>
            </Form>
            <Button style={{margin:"1rem"}} onClick={closehandler}>Close</Button>
        </Card>
      )}
      </Card>
      </Container>
  );
};

export default Home;
