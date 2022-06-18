import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
const Starter = () => {
  return (
    <div>
      <Row>
        <Col xs="12" md="12" sm="12" xl="8" xxl="8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Preguntas Stackoverflow
            </CardTitle>
            <CardBody className=""></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
