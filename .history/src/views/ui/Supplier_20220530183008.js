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
  const [show, setShow] = useState(false);
  const [idSupplier, setIdSuppplier] = useState(0);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [variant, setVariant] = useState("success");
  const [open, setOpen] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getSpulliers();
  }, []);

  const getSpulliers = () => {
    axios
      .get("http://localhost:8080/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };

  const getAlert = (info, variant, message) => {
    setInfo(info);
    setVariant(variant);
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const submitValue = () => {
    const data = {
      name: name,
      email: email,
      tel: tel,
      address: address,
    };

    axios
      .post("http://localhost:8080/supplier", data)
      .then((response) => {
        updateImage();
        handleClose();
        getProducts();
        getAlert("Hecho!", "success", "Proveedor agregado");
      })
      .catch((error) => getAlert("Error!", "danger", error));
  };

  return (
    <div>
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
          <i className="bi bi-truck"> </i>
          Proveedores
          <Button
            style={{ float: "right" }}
            className="btn"
            color="primary"
            onClick={handleShow}
          >
            Agregar Proveedor
          </Button>
        </CardTitle>
        <CardBody className="">
          <Table bordered>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Direccion</th>
              </tr>
            </thead>
            <tbody>
              {suppliers &&
                suppliers.map((item) => (
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.tel}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Input hidden value={idSupplier}></Input>
              <Label for="name">Nombre proveedor</Label>
              <Input
                id="name"
                name="name"
                placeholder="Inserte nombre proveedor"
                type="name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Correo</Label>
              <Input
                id="email"
                name="email"
                placeholder="Inserte correo"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Telefono</Label>
              <Input
                id="tel"
                name="tel"
                placeholder="Inserte telefono"
                type="text"
                onChange={(e) => setTel(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Direccion</Label>
              <Input
                id="address"
                name="adddress"
                placeholder="Inserte Direcion"
                type="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary">Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Supplier;
