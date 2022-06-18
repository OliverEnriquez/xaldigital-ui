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
              <Input type="select">
                <option>Numero de respuestas contestadas</option>
                <option>Numero de respuestas no contestadas</option>
                <option>Menor numero de visitas</option>
                <option>Respuesta mas vieja</option>
                <option>Respuesta mas nueva</option>
              </Input>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
