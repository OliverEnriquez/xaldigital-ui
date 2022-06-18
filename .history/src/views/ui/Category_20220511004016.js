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

const Category = () => {
  const [show, setShow] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => {
    setShow(false);
    setCategoryName("");
    setCategoryId("");
  };
  const handleShow = () => setShow(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [variant, setVariant] = useState("success");
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    name: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };

  const submitValue = () => {
    const data = {
      id: categoryId,
      name: categoryName,
    };
    axios
      .post("http://localhost:8080/category/", data)
      .then((response) => {
        handleClose();
        getCategories();
        setCategoryName("");
        getAlert("Hecho!", "success", "Se guardo categoria");
      })
      .catch((error) => {
        getAlert("Error!", "danger", "Error al guardar: " + error);
        console.error("Something went wrong!", error);
      });
  };

  const editCategory = (id, name) => {
    setCategoryName(name);
    setCategoryId(id);
    handleShow();
  };

  const showWarning = (id) => {
    setCategoryId(id);
    handleShowDelete();
  };

  const deleteCategory = () => {
    axios
      .delete("http://localhost:8080/category/" + categoryId)
      .then((response) => {
        handleCloseDelete();
        getCategories();
        getAlert("Hecho!", "success", "Se elimno categoria");
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        getAlert("Error!", "danger", "Error al eliminar categoria");
      });
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

  return (
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Input value={categoryId} hidden></Input>
              <Label for="exampleEmail">Nombre</Label>
              <Input
                value={categoryName}
                id="exampleEmail"
                name="email"
                placeholder="Inserte nombre categoria"
                type="email"
                onChange={(e) => setCategoryName(e.target.value)}
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
          <Modal.Title>Eliminar Categoria</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Estas seguro de eliminar la categoria.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button color="secondary" onClick={handleCloseDelete}>
            Cerrar
          </Button>
          <Button color="danger" onClick={deleteCategory}>
            Elimnar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
