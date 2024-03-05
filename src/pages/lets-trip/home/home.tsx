import { useActions } from '@/common/hooks';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'All Agents',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Agent',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 10],
      backgroundColor: '#5800FF',
    },
  ],
};

export const LetsTripHome = () => {
  const { getAgentOrdersStatis } = useActions();
  useEffect(() => {
    getAgentOrdersStatis({ start: '12.01.2024', end: '12.02.2024' });
  }, [getAgentOrdersStatis]);

  return <Bar options={options} data={data} />;
};
