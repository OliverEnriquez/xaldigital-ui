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
  const [aerolineas, setAerolineas] = useState([]);
  const [isAerolinea, setIsAerolinea] = useState(true);

  useEffect(() => {
    getAirpot();
  }, []);

  const getAirpot = () => {
    FlightsService.aeropuerto().then((response) => {
      setResult("Aeropuerto con mas movimiento : " + response.data);
    });
  };

  const onChangeResult = (e) => {
    setIsAerolinea(true);
    const msj = "";
    if (e === "1") {
      getAirpot();
    }
    if (e === "2") {
      setIsAerolinea(true);
      FlightsService.aerolinea().then((response) => {
        setResult("Aerolinea con mas vuelos : " + response.data);
      });
    }
    if (e === "3") {
      FlightsService.dia().then((response) => {
        setIsAerolinea(true);
        setResult(
          "Dia con mas vuelos : " + moment(response.data).format("DD/MM/YYYY")
        );
      });
    }
    if (e === "4") {
      FlightsService.moreThree().then((response) => {
        setIsAerolinea(false);
        setAerolineas(response.data);
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
                    <option value="1">Aeropuerto mayor movimiento</option>
                    <option value="2">Aerolinea Mayor numero de vuelos</option>
                    <option value="3">Dia con mayor vuelos</option>
                    <option value="4">
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
                  <h3 hidden={!isAerolinea}>{result}</h3>
                  <div hidden={isAerolinea}>
                    <h3>Aerolineas con mas de dos vuelos al dia</h3>
                    <ul style={{ listStyle: none }}>
                      {aerolineas.map((item) => (
                        <li>
                          <h3>- {item}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
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
