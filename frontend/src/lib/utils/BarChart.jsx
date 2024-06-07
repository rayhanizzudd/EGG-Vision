// Importing necessary libraries and components
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the chart

// BarChart component rendering the Bar chart
const BarChart = ({activity}) => {
  console.log(activity)
  const labels = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  const gradeAData = [];
  const gradeBData = [];
  const gradeCData = [];

  labels.forEach(day => {
    gradeAData.push(activity[day] ? activity[day]["A"] : 0);
    gradeBData.push(activity[day] ? activity[day]["B"] : 0);
    gradeCData.push(activity[day] ? activity[day]["C"] : 0);
});

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Grade A",
        data: gradeAData,
        backgroundColor: "rgba(255, 232, 199, 1)",
        borderColor: "rgba(255, 232, 199, 1)",
        borderWidth: 1,
      },
      {
        label: "Grade B",
        data: gradeBData,
        backgroundColor: "rgba(255, 147, 119, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Grade C",
        data: gradeCData,
        backgroundColor: "rgba(189, 66, 46, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Telur Dalam Minggu",
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />;
    </div>
  );
};

export default BarChart;
