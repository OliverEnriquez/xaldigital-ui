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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "jspdf-autotable";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [total, setTotal] = useState(0);
  const [dateInital, setDateinitail] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [token, setToken] = useState("");

  useEffect(() => {
    getPurchases();
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.jwt);
  }, [token]);

  const getPurchases = () => {
    axios
      .get("http://localhost:8080/purchases", {
        params: { dateI: "", dateF: "" },
      })
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

  const searchByDate = () => {
    var formattedDate = format(startDate, "yyyy/MM/dd");
    var formattedDateFinal = format(finalDate, "yyyy/MM/dd");
    console.log(startDate);
    const data = { dateI: startDate, dateF: startDate };
    axios
      .get("http://localhost:8080/purchases", {
        params: { dateI: formattedDate, dateF: formattedDateFinal },
      })
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
                <Row>
                  <Col>
                    <ReactHTMLTableToExcel
                      className="btn btn-primary"
                      table="purchase-table"
                      filename="compras"
                      sheet="Sheet"
                      buttonText="Exportar excel"
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ width: 160 }}
                      className="btn"
                      color="primary"
                      onClick={createPdf}
                    >
                      Generar reporte
                    </Button>
                  </Col>
                </Row>
              </div>
            </CardTitle>
            <CardBody className="">
              <Row style={{ marginBottom: 20 }}>
                <Col
                  xxl="5"
                  lg="5"
                  md="5"
                  sm="5"
                  xs="12"
                  style={{ float: "right" }}
                >
                  <Label for="name">Desde: </Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    style={{ maxWidth: 500 }}
                  />
                </Col>
                <Col
                  xxl="5"
                  lg="5"
                  md="5"
                  sm="5"
                  xs="12"
                  style={{ float: "right" }}
                >
                  <Label for="name">a: </Label>
                  <DatePicker
                    selected={finalDate}
                    onChange={(date: Date) => setFinalDate(date)}
                  />
                </Col>
                <Col xxl="2" lg="2" md="2" sm="2" xs="12">
                  <Button
                    className="btn"
                    color="primary"
                    onClick={searchByDate}
                    style={{ marginTop: 26 }}
                  >
                    Filtrar
                  </Button>
                </Col>
              </Row>

              <Table bordered id="purchase-table" responsive>
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
