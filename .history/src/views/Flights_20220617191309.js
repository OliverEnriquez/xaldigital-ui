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
import FlightsService from "../services/flights.service";
import moment from "moment";
const Flights = () => {
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    getAirpot();
  }, []);

  const getAirpot = () => {
    FlightsService.aeropuerto().then((response) => {
      setResult("Aeropuerto con mas movimiento :" + response.data);
    });
  };

  const onChangeResult = (e) => {
    const msj = "";
    if (e === "1") {
      getAirpot();
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
        setResult(
          "Respuesta mas vieja :" +
            moment(response.data.oldDate).format("DD/MM/YYYY hh:mm:ss")
        );
      });
    }
    if (e === "5") {
      QuestionService.date().then((response) => {
        setResult(
          "Preguntas contestadas :" +
            moment(response.data.recentDate).format("DD/MM/YYYY hh:mm:ss")
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
