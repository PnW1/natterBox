import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
// import { Chart } from 'chart.js/auto';
const BarChart = ({chartData, setSelectedYear}) => {
  const charOptions = {
    onClick: (event, elements) => {
      console.log(chartData.labels[elements[0].index])
      setSelectedYear(chartData.labels[elements[0].index])
    }
  }
  return <Line data={chartData} options={charOptions} />
}

export default BarChart
