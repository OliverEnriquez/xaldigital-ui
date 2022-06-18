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
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [model, setModel] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idSupplier, setIdSupplier] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sale, setSale] = useState(0.0);
  const [purchase, setPurchase] = useState(0.0);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [variant, setVariant] = useState("success");
  const [open, setOpen] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const history = useNavigate();
  const [file, setFile] = useState();
  const [disabledFile, setDisabledFile] = useState(true);
  const [fileDir, setFileDir] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [qr, setQr] = useState("");
  const handleShowDelete = (id) => {
    console.log(id);
    setIdProduct(id);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  let data = new FormData();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setIdProduct(null);
    setNameProduct("");
    setModel("");
    setIdCategory("");
    setIdSupplier("");
    setQuantity(0);
    setSale(0.0);
    setPurchase(0.0);
    setShow(true);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getSuppliers();
  }, []);

  const getCategories = () => {
    axios.get("http://localhost:8080/categories").then((response) => {
      setCategory(response.data);
    });
  };

  const getSuppliers = () => {
    axios.get("http://localhost:8080/suppliers").then((response) => {
      setSuppliers(response.data);
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
    const purchaseProduct = 0.0;
    if (quantity > 0) {
      purchaseProduct = 10 * 5;
    }
    const data = {
      id: idProduct,
      name: nameProduct,
      model: model,
      id_category: idCategory,
      quantity: quantity,
      idSupplier: idSupplier,
      qr: qr,
      sale: sale,
      purchase: purchase,
    };

    axios
      .post("http://localhost:8080/product", data)
      .then((response) => {
        addPurchase(purchaseProduct);
        updateImage();
        handleClose();
        getProducts();
        getAlert("Hecho!", "success", "Poducto agregado");
      })
      .catch((error) => getAlert("Error!", "danger", error));
  };

  const addPurchase = (purchaseProduct) => {
    axios
      .post("http://localhost:8080/purchase/" + purchaseProduct)
      .then((response) => {})
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

  const editProduct = (
    id,
    name,
    model,
    category,
    quantity,
    idSupplier,
    qrImage,
    sale,
    purchase
  ) => {
    setIdProduct(id);
    setNameProduct(name);
    setModel(model);
    setIdCategory(category);
    setQuantity(quantity);
    setIdSupplier(idSupplier);
    setQr(qrImage);
    setSale(sale);
    setPurchase(purchase);

    setShow(true);
  };

  const viewPage = (
    idProduct,
    nameProduct,
    modelName,
    categoryName,
    quantity
  ) => {
    history("/viewProduct?id=" + idProduct);
  };

  function handleChange(e) {
    setFileDir(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  function isNameNotEmpty(name) {
    setNameProduct(name);
    if (nameProduct != null || nameProduct != "") {
      setDisabledFile(false);
    }
  }

  function updateImage() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", nameProduct);
    axios({
      method: "post",
      url: "http://localhost:8080/image",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  const deleteProduct = () => {
    axios
      .delete("http://localhost:8080/product/" + idProduct)
      .then((response) => {
        handleCloseDelete();
        getProducts();
        getAlert("Hecho!", "success", "Se elimno product");
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        getAlert("Error!", "danger", "Error al eliminar producto");
      });
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
                    <th>Proveedor</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Precio venta</th>
                    <th>Precio compra</th>
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
                        <td>{item.supplier != null ? item.supplier : ""}</td>
                        <td>{item.model}</td>
                        <td>{item.quantity}</td>
                        <td>{item.sale.toFixed(2)}</td>
                        <td>{item.purchase.toFixed(2)}</td>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              viewPage(
                                item.id,
                                item.name,
                                item.model,
                                item.category,
                                item.quantity
                              )
                            }
                          >
                            <i class="bi bi-eye"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              editProduct(
                                item.id,
                                item.name,
                                item.model,
                                item.id_category,
                                item.quantity,
                                item.idSupplier,
                                item.qr,
                                item.sale,
                                item.purchase
                              )
                            }
                          >
                            <i class="bi bi-pencil"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => handleShowDelete(item.id)}
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
              <Input
                md="3"
                lg="3"
                xs="6"
                style={{ width: "15" }}
                id="exampleSelect"
                name="select"
                type="select"
                value={idSupplier}
                onChange={(e) => setIdSupplier(e.target.value)}
              >
                <option>Seleciona un proveedor</option>
                {suppliers?.map((obj) => {
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
              <Label>Venta</Label>
              <Input
                type="number"
                onChange={(e) => setSale(e.target.value)}
                value={sale}
              ></Input>
              <Label>Compra</Label>
              <Input
                type="number"
                onChange={(e) => setPurchase(e.target.value)}
                value={purchase}
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
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Estas seguro de eliminar el producto.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button color="secondary" onClick={handleCloseDelete}>
            Cerrar
          </Button>
          <Button color="danger" onClick={deleteProduct}>
            Elimnar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
