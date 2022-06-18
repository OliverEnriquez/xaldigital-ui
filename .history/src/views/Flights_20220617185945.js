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
const Starter = () => {
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
                    <option value="1">Numero de respuestas contestadas</option>
                    <option value="2">
                      Numero de respuestas no contestadas
                    </option>
                    <option value="3">Menor numero de visitas</option>
                    <option value="4">Respuesta mas vieja</option>
                    <option value="5">Respuesta mas nueva</option>
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
                  <h3>{result}</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
