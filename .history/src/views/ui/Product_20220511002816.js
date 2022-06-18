import { Col, Row, Card, CardTitle, CardBody, Table } from "reactstrap";
import React, { useEffect, useState, useForm } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.error("Error: " + error));
  };
  return (
    <div>
      <Row>
        <Col xs="8" md="8" lg="8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-box-seam me-2"> </i>
              Productos
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
                        <th scope="row">1</th>
                        <td>{item.name}</td>
                        <td>item.category</td>
                        <td>item.model</td>
                        <td>item.quantity</td>
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
