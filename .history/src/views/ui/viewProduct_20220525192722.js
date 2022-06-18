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
  Label,
} from "reactstrap";
import { Modal, Alert, Collapse, View } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
function ViewProduct(props) {
  const [idProduct, setIdProduct] = useState(0);
  const [image, setImage] = useState();
  const location = useLocation();

  useEffect(() => {
    setIdProduct(location.state.id);
    setImage("http://localhost:8080/get/image/" + location.state.name);
    console.log(image);
  }, []);

  return (
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
              <Col lg="5" md="5" sm="8" xs="12">
                <img
                  src={image}
                  className="img-thumbnail"
                  alt="..."
                  style={{ maxWidth: "24rem", width: "22rem", height: "15rem" }}
                />
                <br />
              </Col>
              <Col lg="7" md="7">
                <Col lg="6" md="6" sm="12" xs="12">
                  <Label>
                    <b>Nombre:</b>
                  </Label>
                  <h6>{location.state.name}</h6>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                  <Label>
                    <b>Modelo:</b>
                  </Label>
                  <h6>{location.state.model}</h6>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                  <Label>
                    <b>Categoria:</b>
                  </Label>
                  <h6>{location.state.category}</h6>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                  <Label>
                    <b>Cantidad:</b>
                  </Label>
                  <h6>{location.state.quantity}</h6>
                </Col>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default ViewProduct;
