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
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = (id) => {
    setIdSuppplier(id);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setIdSuppplier(null);
    setName("");
    setEmail("");
    setTel("");
    setAddress("");
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
      id: idSupplier,
      name: name,
      email: email,
      tel: tel,
      address: address,
    };

    axios
      .post("http://localhost:8080/supplier", data)
      .then((response) => {
        handleClose();
        getSpulliers();
        getAlert("Hecho!", "success", "Proveedor agregado");
      })
      .catch((error) => getAlert("Error!", "danger", error));
  };

  const edit = (
    id,
    nameSupplier,
    emailSupplier,
    telSupplier,
    addressSupplier
  ) => {
    setIdSuppplier(id);
    setName(nameSupplier);
    setEmail(emailSupplier);
    setTel(telSupplier);
    setAddress(addressSupplier);
    setShow(true);
  };

  const deleteSupplier = () => {
    console.log("http://localhost:8080/supplier/" + idSupplier)ñ
    axios
      .delete("http://localhost:8080/supplier/" + idSupplier)
      .then((response) => {
        handleCloseDelete();
        getSpulliers();
        getAlert("Hecho!", "success", "Se elimno product");
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        getAlert("Error!", "danger", "Error al eliminar producto");
      });
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
                <th>Editar</th>
                <th>Eliminar</th>
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
                    <td>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          edit(
                            item.id,
                            item.name,
                            item.email,
                            item.tel,
                            item.address
                          )
                        }
                      >
                        <i class="bi bi-pencil"></i>
                      </a>
                    </td>
                    <td>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleShowDelete(item.id)}
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
                value={name}
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
                value={email}
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
                value={tel}
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
                value={address}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={submitValue}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar proveedor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Estas seguro de eliminar el proveedor.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button color="secondary" onClick={handleCloseDelete}>
            Cerrar
          </Button>
          <Button color="danger" onClick={deleteSupplier}>
            Elimnar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Supplier;
