import React, {
  useEffect,
  useState,
  useForm,
  useNavigationParam,
  Image,
} from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Modal, Alert, Collapse, View } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
function ViewProduct(props) {
  const [idProduct, setIdProduct] = useState(0);
  const [image, setImage] = useState();
  const [qr, setQr] = useState();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sale, setSale] = useState(0.0);
  const [purchase, setPurchase] = useState(0.0);
  const location = useLocation();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [visibleQR, setVisibleQR] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [qty, setQty] = useState(0);

  const [showAddSale, setShowAddSale] = useState(false);

  useEffect(() => {
    setIdProduct(id);
    getProduct();
  }, []);

  function getProduct() {
    axios
      .get("http://localhost:8080/product/" + id)
      .then((response) => {
        setName(response.data.name);
        setModel(response.data.model);
        setCategory(response.data.category);
        setQuantity(response.data.quantity);
        setSale(response.data.sale);
        setPurchase(response.data.purchase);
        setImage("http://localhost:8080/get/image/" + response.data.name);
        if (response.data.qr == null) {
          setVisibleQR(false);
        } else {
          setQr("http://localhost:8080/qr/" + id + "/" + 0);
          setVisibleQR(true);
        }
      })
      .catch((error) => console.error("Error: " + error));
  }

  const generateQr = () => {
    axios
      .post("http://localhost:8080/product/qr/" + id)
      .then(() => {
        axios
          .get("http://localhost:8080/generate/qr/" + id)
          .then(() => {
            setQr("http://localhost:8080/qr/" + id);
            getProduct();
          })
          .catch((error) => console.error("Error: " + error));
      })
      .catch((error) => console.error("Error!", "danger", error));
  };

  const handleClose = () => {
    setShowAdd(false);
  };
  const handleShow = () => {
    setQty(0);
    setShowAdd(true);
  };

  const handleCloseSale = () => {
    setShowAddSale(false);
  };
  const handleShowSale = () => {
    setQty(0);
    setShowAddSale(true);
  };

  const handleCloseRemove = () => {
    setShowRemove(false);
  };
  const handleShowRemove = () => setShowRemove(true);

  function addQuantity() {
    const q = qty + 1;
    setQty(q);
  }

  function removeQuantity() {
    const q = qty - 1;
    setQty(q);
  }

  const purchaseProduct = () => {
    const q = quantity + qty;
    axios
      .post(
        "http://localhost:8080/purchase/" +
          qty * purchase +
          "/" +
          qty +
          "/" +
          id
      )
      .then((response) => {})
      .catch((error) => console.log("Error!", "danger", error));

    axios
      .post("http://localhost:8080/product/qty/" + q + "/" + id)
      .then(() => {
        getProduct();
        handleCloseRemove();
        handleClose();
      })
      .catch((error) => console.error("Error!", "danger", error));
  };

  const saleProduct = () => {
    const q = quantity - qty;
    axios
      .post(
        "http://localhost:8080/sale/" + qty * purchase + "/" + qty + "/" + id
      )
      .then((response) => {})
      .catch((error) => console.log("Error!", "danger", error));
  };

  function updateQty(q) {
    axios
      .post("http://localhost:8080/product/qty/" + q + "/" + id)
      .then(() => {
        getProduct();
        handleCloseRemove();
        handleClose();
      })
      .catch((error) => console.error("Error!", "danger", error));
  }

  return (
    <div>
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <a href="/#/producto">
            <i class="bi bi-arrow-left">Regresar</i>
          </a>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-info-circle"> </i>
              Informacion del Producto
            </CardTitle>
            <CardBody className="p-4">
              <Row justify-content>
                <Col lg="4" md="4" sm="8" xs="12">
                  <img
                    src={image}
                    className="img-thumbnail"
                    alt="..."
                    style={{
                      maxWidth: "24rem",
                      width: "19rem",
                      height: "15rem",
                    }}
                  />
                  <br />
                </Col>
                <Col lg="5" md="5">
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Nombre:</b>
                    </Label>
                    <h6>{name}</h6>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Modelo:</b>
                    </Label>
                    <h6>{model}</h6>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Categoria:</b>
                    </Label>
                    <h6>{category}</h6>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Cantidad:</b>
                    </Label>
                    <h6>{quantity}</h6>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Precio Venta:</b>
                    </Label>
                    <h6>{sale.toFixed(2)}</h6>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12">
                    <Label>
                      <b>Precio Compra:</b>
                    </Label>
                    <h6>{purchase.toFixed(2)}</h6>
                  </Col>
                </Col>
                <Col lg="3" md="3">
                  <Col
                    lg="6"
                    md="6"
                    sm="12"
                    xs="12"
                    style={{ display: "table-cell", textAlign: "center" }}
                  >
                    <Button
                      className="btn"
                      color="primary"
                      onClick={generateQr}
                      hidden={visibleQR}
                    >
                      Generar QR
                    </Button>
                    <img
                      hidden={!visibleQR}
                      src={qr}
                      className="img-thumbnail"
                      alt="..."
                      style={{
                        maxWidth: "24rem",
                        width: "11rem",
                        height: "11rem",
                        marginTop: 20,
                      }}
                    />
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col
                  lg="12"
                  md="12"
                  sm="12"
                  xs="12"
                  style={{ textAlign: "end", marginTop: 20 }}
                >
                  <Button
                    className="btn"
                    color="primary"
                    style={{ marginLeft: 80 }}
                    onClick={handleShow}
                  >
                    Compra
                  </Button>
                  <Button
                    className="btn"
                    color="primary"
                    style={{ marginLeft: 80 }}
                    onClick={handleShowSale}
                  >
                    Venta
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup style={{ textAlign: "center" }}>
              <Input value={id} hidden></Input>
              <Label for="exampleEmail">
                Cuantos productos deseas agregar o quitar
              </Label>
            </FormGroup>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button color="danger" onClick={removeQuantity}>
                -
              </Button>
              <Input
                style={{
                  width: 60,
                  display: "block",
                  marginRight: 5,
                  marginLeft: 5,
                }}
                type="text"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
              />
              <Button color="primary" onClick={addQuantity}>
                +
              </Button>
            </FormGroup>

            <Row className="mb-6" md="2">
              <FormGroup md="6" lg="6" xs="12">
                <Label>
                  <b>Precio por unidad</b>
                </Label>
                <Input type="text" value={purchase} disabled={true} />
              </FormGroup>
              <FormGroup md="6" lg="6" xs="12">
                <Label>
                  <b>Total</b>
                </Label>
                <Input
                  type="text"
                  value={(qty * purchase).toFixed(2)}
                  disabled={true}
                />
              </FormGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={purchaseProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddSale} onHide={handleCloseSale}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup style={{ textAlign: "center" }}>
              <Input value={id} hidden></Input>
              <Label for="exampleEmail">Cuantos productos deseas vender</Label>
            </FormGroup>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button color="danger" onClick={removeQuantity}>
                -
              </Button>
              <Input
                style={{
                  width: 60,
                  display: "block",
                  marginRight: 5,
                  marginLeft: 5,
                }}
                type="text"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
              />
              <Button color="primary" onClick={addQuantity}>
                +
              </Button>
            </FormGroup>

            <Row className="mb-6" md="2">
              <FormGroup md="6" lg="6" xs="12">
                <Label>
                  <b>Precio por unidad</b>
                </Label>
                <Input type="text" value={sale} disabled={true} />
              </FormGroup>
              <FormGroup md="6" lg="6" xs="12">
                <Label>
                  <b>Total</b>
                </Label>
                <Input
                  type="text"
                  value={(qty * sale).toFixed(2)}
                  disabled={true}
                />
              </FormGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleCloseSale}>
            Cancelar
          </Button>
          <Button color="primary" onClick={saleProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ViewProduct;
