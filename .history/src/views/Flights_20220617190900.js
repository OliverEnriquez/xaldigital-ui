import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import QuestionService from "../services/question.service";
import moment from "moment";
const Flights = () => {
  return (
    <div>
      <Row>
        <Col xs="12" md="12" sm="12" xl="8" xxl="8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Preguntas Stackoverflow
            </CardTitle>
            <CardBody className="">
              <Row>
                <Col lg="12" md="12" xxl="12">
                  <Input type="select">
                    <option value="1">Aeropuerto mayor movimiento</option>
                    <option value="2">Aerolinea Mayor numero de vuelos</option>
                    <option value="3">Dia con mayor vuelos</option>
                    <option value="4">Respuesta mas vieja</option>
                    <option value="5">
                      Aerolineas con mas de dos vuelos al dia
                    </option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col
                  lg="12"
                  md="12"
                  xxl="12"
                  style={{ textAlign: "center", marginTop: 50 }}
                >
                  <h3></h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Flights;
