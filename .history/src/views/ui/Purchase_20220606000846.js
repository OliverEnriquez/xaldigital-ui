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

import ReactHTMLTableToExcel from "react-html-table-to-excel";

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
              <div style={{ float: "right" }}>
                <ReactHTMLTableToExcel
                  className="btn btn-primary"
                  table="purchase-table"
                  filename="ReportExcel"
                  sheet="Sheet"
                  buttonText="Exportar excel"
                />
              </div>
            </CardTitle>
            <CardBody className="">
              <Table bordered id="purchase-table">
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
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.price.toFixed(2)}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.date}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.purchase.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td colspan={8} style={{ textAlign: "center" }}>
                    <b style={{ textAlign: "center" }}>{total.toFixed(2)}</b>
                  </td>
                </tfoot>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Purchase;
