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
import { useHistory } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [model, setModel] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [variant, setVariant] = useState("success");
  const [open, setOpen] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setIdProduct(null);
    setNameProduct("");
    setModel("");
    setIdCategory("");
    setQuantity(0);
    setShow(true);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    axios.get("http://localhost:8080/categories").then((response) => {
      setCategory(response.data);
    });
  };

  const getProducts = () => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };

  const submitValue = () => {
    const data = {
      name: nameProduct,
      model: model,
      id_category: idCategory,
      quantity: quantity,
    };

    axios
      .post("http://localhost:8080/product", data)
      .then((response) => {
        handleClose();
        getProducts();
        getAlert("Hecho!", "success", "Poducto agregado");
      })
      .catch((error) => getAlert("Error!", "danger", error));
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

  const editProduct = (name, model, category, quantity) => {
    setNameProduct(name);
    setModel(model);
    setCategory(category);
    setQuantity(quantity);
    handleShow();
  };

  const viewPage = () => {
    history.push("/categoria");
  };

  return (
    <div>
      <Row>
        <Col xs="12" md="12" lg="12">
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
              <i className="bi bi-box-seam me-2"> </i>
              Productos
              <Button
                style={{ float: "right" }}
                className="btn"
                color="primary"
                onClick={handleShow}
              >
                Agregar Producto
              </Button>
            </CardTitle>
            <CardBody className="">
              <Table bordered>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Ver producto</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((item) => (
                      <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.model}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <a style={{ cursor: "pointer" }} onClick={viewPage}>
                            <i class="bi bi-eye"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              editProduct(
                                item.name,
                                item.model,
                                item.idCategory,
                                item.quantity
                              )
                            }
                          >
                            <i class="bi bi-pencil"></i>
                          </a>
                        </td>
                        <td>
                          <a style={{ cursor: "pointer" }}>
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
                onChange={(e) => setNameProduct(e.target.value)}
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

export default Product;
