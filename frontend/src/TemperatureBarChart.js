import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

const GraphPage = ({ data }) => {
  var array = []
    for (let i = 0; i < data.Temperature.length; i++) {
      array.push(i*10);
    }

  const barChartData = {
    labels: array,
    datasets: [
      {
        label: 'Temperature',
        data: data.Temperature,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={barChartData}  />;
};

export default GraphPage;
