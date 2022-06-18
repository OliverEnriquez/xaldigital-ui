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
import React, { useState } from "react";
import { ms } from "date-fns/locale";
const Starter = () => {
  const [result, setResult] = useState("");

  const onChangeResult = (e) => {
    const msj = "";
    if (e === "1") {
      msj = "a";
    } else if (e === "2") {
      msj = "b";
    } else if (e === "3") {
      msj = "c";
    } else if (e === "4") {
      msj = "d";
    } else if (e === "5") {
      msj = "e";
    }
    setResult(e);
  };

  return (
    <div>
      <Row>
        <Col xs="12" md="12" sm="12" xl="8" xxl="8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Preguntas Stackoverflow
            </CardTitle>
            <CardBody className="">
              <Input
                type="select"
                onChange={(e) => onChangeResult(e.target.value)}
              >
                <option value="1">Numero de respuestas contestadas</option>
                <option value="2">Numero de respuestas no contestadas</option>
                <option value="3">Menor numero de visitas</option>
                <option value="4">Respuesta mas vieja</option>
                <option value="5">Respuesta mas nueva</option>
              </Input>

              <h3>{result}</h3>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
