import React, {
  useEffect,
  useState,
  useForm,
  useRef,
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
  const location = useLocation();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [visibleQR, setVisibleQR] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [qty, setQty] = useState(0);
  const myContainer = useRef(null);

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
  const handleShow = () => setShowAdd(true);

  const handleCloseRemove = () => {
    setShowRemove(false);
  };
  const handleShowRemove = () => setShowRemove(true);

  function addQuantity() {
    const q = quantity + parseInt(qty);
    axios
      .post("http://localhost:8080/product/qty/" + q + "/" + id)
      .then(() => {
        getProduct();
        handleClose();
      })
      .catch((error) => console.error("Error!", "danger", error));
  }

  function removeQuantity() {
    const q = quantity - parseInt(qty);
    axios
      .post("http://localhost:8080/product/qty/" + q + "/" + id)
      .then(() => {
        getProduct();
        handleCloseRemove();
      })
      .catch((error) => console.error("Error!", "danger", error));
  }

  function print() {
    console.log(myContainer.current);
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      "<html><head><title>" + document.title + "</title>"
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write(
      "<img src='https://culturacolectiva-cultura-colectiva-prod.cdn.arcpublishing.com/resizer/Msf6aRG54gOyN7KQiV6aHkBAxOg=/1024x768/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/culturacolectiva/AY3FD3Q3XVCVTPTD53VEIZK2ZA.jpg' style='width:500px;height:600px;'>"
    );
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    console.log(mywindow.document);
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
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
                    <div ref={myContainer}>
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
                    </div>
                    <Button className="print" onClick={print}>
                      PRINT
                    </Button>
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
                    color="danger"
                    onClick={handleShowRemove}
                  >
                    Quitar
                  </Button>
                  <Button
                    className="btn"
                    color="primary"
                    style={{ marginLeft: 80 }}
                    onClick={handleShow}
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar a inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup style={{ textAlign: "center" }}>
              <Input value={id} hidden></Input>
              <Label for="exampleEmail">Cuantos productos deseas agregar</Label>
              <Input
                type="number"
                style={{
                  width: 80,
                  display: "block",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                onChange={(e) => setQty(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={addQuantity}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Quitar a inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup style={{ textAlign: "center" }}>
              <Input value={id} hidden></Input>
              <Label for="exampleEmail">Cuantos productos deseas quitar</Label>
              <Input
                style={{
                  width: 80,
                  display: "block",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                type="number"
                onChange={(e) => setQty(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleCloseRemove}>
            Cancelar
          </Button>
          <Button color="primary" onClick={removeQuantity}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ViewProduct;
