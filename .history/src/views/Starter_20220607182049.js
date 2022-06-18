import { Col, Row } from "reactstrap";
import PurchaseChart from "../components/dashboard/PurchaseChart";
import SalesChart from "../components/dashboard/SalesChart";

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <PurchaseChart />
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <SalesChart />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
