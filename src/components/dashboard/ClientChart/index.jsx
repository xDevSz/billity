// src/components/dashboard/ClientChart/index.jsx
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ClientChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Novos Clientes',
        data: data.map(d => d.newClients),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Evolução da Base de Clientes', color: '#e0e0e0', font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: '#b0b0b0' }, grid: { color: 'rgba(90,90,90,0.5)' } },
      y: { ticks: { color: '#b0b0b0' }, grid: { color: 'rgba(90,90,90,0.5)' } },
    },
  };

  return <Line options={options} data={chartData} />;
};

ClientChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    newClients: PropTypes.number.isRequired,
  })).isRequired,
};

export default ClientChart;