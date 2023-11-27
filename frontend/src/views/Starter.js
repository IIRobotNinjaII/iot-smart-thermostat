import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";
import { useParams } from "react-router-dom";
import { useDataContext } from "../data/DataContext";


const Starter = () => {
  const { id } = useParams();
  const { data } = useDataContext();
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3" >
          <TopCards
            bg="bg-light-success text-success"
            color={data[id].thermostaton ? "success" : "danger"}
            title="Temperature"
            subtitle="Temperature"
            earning={data[id].Temperature[data[id].Temperature.length - 1] + "ºC"}
            icon="bi bi-thermometer"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            color={data[id].humidifieron ? "success" : "danger"}
            title="Humidity"
            subtitle="Humidity"
            earning={data[id].Humidity[data[id].Humidity.length - 1] + "%"}
            icon="bi bi-moisture"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Particulate Matter"
            subtitle="Particulate Matter"
            earning={data[id].PM[data[id].PM.length - 1] + " ppm"}
            icon="bi bi-globe-americas"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="CO2"
            subtitle="CO2"
            earning={data[id].CO2[data[id].CO2.length - 1] + " ppm"}
            icon="bi bi-fire"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart data={data[id]} />
        </Col>
      </Row>

    </div>
  );
};

export default Starter;
