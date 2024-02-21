import { useActions, useTypedSelector } from '@/hooks';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Transfer',
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

export const Home = () => {
  const { getStatistica } = useActions();
  useEffect(() => {
    getStatistica();
  }, []);
  const { statistica } = useTypedSelector((state) => state.tarnsferStatistika);
  const data = {
    labels,
    datasets: [
      {
        label: 'Success orders',
        data: statistica?.success || [],
        backgroundColor: '#38E54D',
        borderColor: '#38E54D',
        borderWidth: 6,
      },
      {
        label: 'Reject orders',
        data: statistica?.reject || [],
        backgroundColor: '#CC3636',
        borderColor: '#CC3636',
        borderWidth: 6,
      },
      {
        label: 'Driver canceled and send reason',
        data: statistica?.send_reason || [],
        backgroundColor: '#5800FF',
        borderColor: '#5800FF',
        borderWidth: 6,
      },
      {
        label: 'Clients canceled',
        data: statistica?.client_canceled || [],
        backgroundColor: '#FF1E00',
        borderColor: '#FF1E00',
        borderWidth: 6,
      },
      {
        label: 'Driver canceled',
        data: statistica?.driver_canceled || [],
        backgroundColor: '#FD5D5D',
        borderColor: '#FD5D5D',
        borderWidth: 6,
      },
      {
        label: 'Client not accepted',
        data: statistica?.client_not_accepted || [],
        backgroundColor: '#FF5B00',
        borderColor: '#FF5B00',
        borderWidth: 6,
      },
    ],
  };
  return <Line options={options} data={data} />;
};
