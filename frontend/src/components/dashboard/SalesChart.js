import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = (data) => {
  const dateObjects = data.data.Date.map((timestamp) => new Date(timestamp));

  const secondsCategories = dateObjects.map((date) => {
    const seconds = date.getSeconds();
    return `${date.getMinutes()}:${seconds < 10 ? "0" : ""}${seconds}`;
  });


  const chartoptions = {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 3,
    },

    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: secondsCategories,
    },
  };

  const series = [
    [
      {
        name: "Temperature",
        data: data.data.Temperature,
      }
    ],
    [
      {
        name: "Humidity",
        data: data.data.Humidity,
      }
    ],

    [{
      name: "CO2",
      data: data.data.CO2,
    },],
    [
      {
        name: "PM",
        data: data.data.PM,
      }]
  ]

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Temperature</CardTitle>
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions}
            series={series[0]}
          ></Chart>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle tag="h5">Humidity</CardTitle>
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions}
            series={series[1]}
          ></Chart>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle tag="h5">CO2</CardTitle>
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions}
            series={series[2]}
          ></Chart>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle tag="h5">PM</CardTitle>
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartoptions}
            series={series[3]}
          ></Chart>
        </CardBody>
      </Card>
    </>


  );
};

export default SalesChart;
