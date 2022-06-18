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
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
var DatePicker = require("reactstrap-date-picker");

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

  const createPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de compras";
    const headers = [
      ["Nombre", "Modelo", "Cantidad", "Precio por unidad", "Fecha", "Total"],
    ];

    const data = purchases.map((element) => [
      element.name,
      element.model,
      element.quantity,
      element.price.toFixed(2),
      element.date,
      element.purchase.toFixed(2),
    ]);

    data.push(["", "", "", "", "Total", total.toFixed(2)]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("compras.pdf");
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
                  filename="compras"
                  sheet="Sheet"
                  buttonText="Exportar excel"
                />
                <Button
                  style={{ float: "right", marginLeft: 10 }}
                  className="btn"
                  color="primary"
                  onClick={createPdf}
                >
                  Generar reporte
                </Button>
              </div>
            </CardTitle>
            <CardBody className="">
              <div style={{ display: "flex" }}>
                <DatePicker
                  id="example-datepicker"
                  style={{ width: 300, marginBottom: 20, marginRight: 20 }}
                  placeholder="Fecha inicio"
                />
              </div>

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
                  <td style={{ textAlign: "center" }}>
                    <b>Total</b>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <b>{total.toFixed(2)}</b>
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
