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

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-box-seam me-2"> </i>
          Proveedores
          <Button style={{ float: "right" }} className="btn" color="primary">
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
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Input
                hidden
                value={idProduct}
                onChange={(e) => setIdProduct(e.target.value)}
              ></Input>
              <Label for="name">Nombre producto</Label>
              <Input
                id="name"
                name="name"
                placeholder="Inserte nombre producto"
                type="name"
                value={nameProduct}
                onChange={(e) => isNameNotEmpty(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input hidden></Input>
              <Label for="name">Modelo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Inserte modelo"
                type="name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                md="3"
                lg="3"
                xs="6"
                style={{ width: "15" }}
                id="exampleSelect"
                name="select"
                type="select"
                value={idCategory}
                onChange={(e) => setIdCategory(e.target.value)}
              >
                <option>Seleciona una categoria</option>
                {category?.map((obj) => {
                  return <option value={obj.id}>{obj.name}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Cantidad</Label>
              <Input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Imagen</Label>
              <Input
                type="file"
                onChange={handleChange}
                disabled={disabledFile}
              />
              <img src={fileDir} style={{ width: 210, marginTop: 14 }} />
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
    </div>
  );
};

export default Supplier;
