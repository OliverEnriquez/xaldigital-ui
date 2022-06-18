import { Col, Row, Card, CardTitle, CardBody, Table, Button } from "reactstrap";
import React, { useEffect, useState, useForm } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };
  return (
    <div>
      <Row>
        <Col xs="12" md="12" lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-box-seam me-2"> </i>
              Productos
              <Button
                style={{ float: "right" }}
                className="btn"
                color="primary"
              ></Button>
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
                          <a style={{ cursor: "pointer" }}>
                            <i class="bi bi-eye"></i>
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
    </div>
  );
};

export default Product;
