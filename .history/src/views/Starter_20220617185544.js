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
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    getAnswers();
  }, []);

  const getAnswers = () => {
    QuestionService.answered().then((response) => {
      setResult("Preguntas contestadas :" + response.data.answered);
    });
  };

  const onChangeResult = (e) => {
    const msj = "";
    if (e === "1") {
      QuestionService.answered().then((response) => {
        setResult("Preguntas contestadas :" + response.data.answered);
      });
    }
    if (e === "2") {
      QuestionService.answered().then((response) => {
        setResult("Preguntas no contestadas :" + response.data.notAnswered);
      });
    }
    if (e === "3") {
      QuestionService.view().then((response) => {
        setResult("Menor # de vistas :" + response.data);
      });
    }
    if (e === "4") {
      QuestionService.date().then((response) => {
        console.log(response.data.oldDate);
        setResult("Respuesta mas vieja :" + response.data.oldDate);
      });
    }
    if (e === "5") {
      QuestionService.date().then((response) => {
        console.log(response.data.oldDate);
        setResult(
          "Preguntas contestadas :" +
            moment(response.data.recentDate).format("dd/MM/YYYY hh:mm:ss")
        );
      });
    }
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
              <Row>
                <Col lg="12" md="12" xxl="12">
                  <Input
                    type="select"
                    onChange={(e) => onChangeResult(e.target.value)}
                  >
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
