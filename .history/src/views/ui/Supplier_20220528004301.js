import {
  Col,
  Row,
  Card,
  CardTitle,
  CardBody,
  Table,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Modal, Alert, Collapse } from "react-bootstrap";
import React, { useEffect, useState, useForm } from "react";
import axios from "axios";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  const getSpulliers = () => {
    axios
      .get("http://localhost:8080/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-box-seam me-2"> </i>
          Proveedores
        </CardTitle>
        <CardBody className="">
          <Table bordered>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {suppliers &&
                suppliers.map((item) => (
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Supplier;
