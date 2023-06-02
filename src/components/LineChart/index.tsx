import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Types
import { LineChartProps } from './lineChart.types';

export const LineChart = ({ title, chartValues }: LineChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels =
    chartValues &&
    chartValues.map((date) => {
      return date.Data;
    });

  const chartzValues: any = {
    labels,
    datasets: [
      {
        label: title,

        data:
          chartValues &&
          chartValues.map((value) => value['Lucro/Prejuizo do Periodo']),
        borderColor: '#FF5733',
        backgroundColor: '#F48169',
      },
    ],
  };

  return (
    <Line
      options={chartOptions}
      data={chartzValues}
      width="100%"
      height={400}
    />
  );
};
