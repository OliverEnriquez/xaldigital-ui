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

  return;
  <div>
    <Row>
      <Col xs="8" md="8" sm="8">
        <Collapse in={open}>
          <div id="example-collapse-text">
            <Alert
              variant={variant}
              onClose={() => setVisibleAlert(false)}
              dismissible
            >
              <Alert.Heading>{info}</Alert.Heading>
              <p>{message}</p>
            </Alert>
          </div>
        </Collapse>

        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Categoria
            <Button
              style={{ float: "right" }}
              className="btn"
              color="primary"
              onClick={handleShow}
            >
              Agregar categoria
            </Button>
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {category &&
                  category.map((item) => (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        <a
                          onClick={() => editCategory(item.id, item.name)}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="bi bi-pencil"></i>
                        </a>
                      </td>
                      <td>
                        <a
                          onClick={() => showWarning(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="bi bi-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>;
};
export default Purchase;
