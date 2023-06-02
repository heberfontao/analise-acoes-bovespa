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
import { LineChartMultiProps } from './lineChartMulti.types';

export const LineChartMulti = ({ title, chartValues }: LineChartMultiProps) => {
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
      title: {
        display: true,
        text: title,
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
        label: 'Variação da ação %',
        data:
          chartValues &&
          chartValues.map((value) => {
            const getValue = value['Adj Close'] * 100;
            return getValue;
          }),
        borderColor: '#FF5733',
        backgroundColor: '#F48169',
      },
      {
        label: 'Variação do IBOVESPA %',
        data:
          chartValues &&
          chartValues.map((value) => {
            const getValue = value['IBOV'] * 100;
            return getValue;
          }),
        borderColor: '#24BDD6',
        backgroundColor: '#69E1F4',
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
