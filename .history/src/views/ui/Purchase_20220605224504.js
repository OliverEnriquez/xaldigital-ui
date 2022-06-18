import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Alert, Collapse } from "react-bootstrap";
import React, { useEffect, useState, useForm } from "react";
import axios from "axios";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchases();
  }, []);

  const getPurchases = () => {
    axios
      .get("http://localhost:8080/purchases")
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };

  return (
    <div>
      <Row>
        <Col xs="12" md="12" sm="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-wallet2"> </i>
              Compras
            </CardTitle>
            <CardBody className="">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Nombre Product</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Precio por unidad</th>
                    <th>Fecha</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases &&
                    purchases.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.model}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toFixed(2)}</td>
                        <td>{item.date}</td>
                        <td>{item.purchase.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Purchase;
