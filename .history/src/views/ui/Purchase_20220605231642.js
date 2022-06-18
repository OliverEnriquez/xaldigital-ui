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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getPurchases();
  }, []);

  const getPurchases = () => {
    axios
      .get("http://localhost:8080/purchases")
      .then((response) => {
        setPurchases(response.data);
        let t = 0;
        response.data.forEach((element) => {
          t += element.purchase;
        });
        console.log(t);
        setTotal(t);
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
                    <th>SKU</th>
                    <th>Nombre Producto</th>
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
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.model}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toFixed(2)}</td>
                        <td>{item.date}</td>
                        <td>{item.purchase.toFixed(2)}</td>
                      </tr>
                    ))}
                  <tr>
                    <td colspan={8}>Total : 1250.8€</td>
                  </tr>
                </tbody>
              </Table>
              <h1>{total.toFixed(2)}</h1>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Purchase;
