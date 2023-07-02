import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Expenselist from "../Component/Expenselist";
import { expenseaction } from "../store/Expenststore";
import { useDispatch, useSelector } from "react-redux";
const AddExpense = () => {
  const [money, setmoney] = useState("");
  const [description, setdescription] = useState("");
  const [catagory, setcatagory] = useState("food");

  const arritem = useSelector((state) => state.expense.item);
  const dispatch=useDispatch()
  const moneyhandler = (e) => {
    setmoney(e.target.value);
  };
  const descriptionhandler = (e) => {
    setdescription(e.target.value);
  };
  const catagoryhandler = (e) => {
    setcatagory(e.target.defaultValue);
  };
  const additemhandler = (e) => {
    e.preventDefault();
    let obj = {
      money: money,
      description: description,
      catagory: catagory,
      id: Math.random().toString(),
    };
    dispatch(expenseaction.Addfromform(obj))
    setmoney("")
    setdescription("")
  }

  const deletehandler = (item) => {
    dispatch(expenseaction.deleteexpense(item))
  }

  const edithandler = (item) => {
    setmoney(item.money)
    setdescription(item.description)
    setcatagory(item.catagory)
    dispatch(expenseaction.deleteexpense(item))

  };
  return (
    <Container>
      <Card style={{ width: "50%", padding: "1rem 3rem", margin: "1rem 25%" }}>
        <Card.Title style={{textAlign:"center"}}><h2>Add Expense</h2></Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Money</Form.Label>
            <Form.Control
              size="sm"
              type="amount"
              onChange={moneyhandler}
              value={money}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              onChange={descriptionhandler}
              value={description}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose catagory</Form.Label>
            <Form.Select size="sm" onChange={catagoryhandler} defaultValue={catagory}>
              <option value="food">food</option>
              <option value="petrol">petrol</option>
              <option value="salary">salary</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={additemhandler}>
            Additem
          </Button>
        </Form>
      </Card>
      <Expenselist
        items={arritem}
        delete={deletehandler}
        edit={edithandler}
      ></Expenselist>
    </Container>
  );
};

export default AddExpense;
