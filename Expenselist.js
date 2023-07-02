import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Expenselist = (props) => {
    const listitem = useSelector((state) => state.expense.item);

  const deletehandler = (item) => {
    props.delete(item);
  };

  const edithandler = (item) => {
    props.edit(item);
  };

  const blob = new Blob([JSON.stringify(listitem)]);
  const herf = URL.createObjectURL(blob);
  return (
    <Card style={{ margin: "0rem 25%", padding: "1rem 3rem" }}>
      <Table size="sm">
        <thead>
          <tr>
            <th>Money</th>
            <th>Description</th>
            <th>Catagory</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody size="sm">
          {props.items.map((item) => (
            <tr key={item.id} id={item.id}>
              <td>{item.money}</td>
              <td>{item.description}</td>
              <td>{item.catagory}</td>
              <td>
                <Button onClick={deletehandler.bind(null, item)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button onClick={edithandler.bind(null, item)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <a href={herf} download="file.csv">
        download
      </a>
    </Card>
  );
};

export default Expenselist;
