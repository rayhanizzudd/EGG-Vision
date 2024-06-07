// Import necessary libraries and components
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ totalFertile, totalNonFertile }) => {
  console.log(totalFertile)
  const data = {
    labels: ["Fertile", "NonFertile"],
    datasets: [
      {
        label: "EGG CONDITION",
        data: [totalFertile, totalNonFertile],
        backgroundColor: ["rgba(189, 66, 46, 1)", "rgba(255, 232, 199, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Telur",
      },
    },
  };

  return (
    <div className="flex">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
