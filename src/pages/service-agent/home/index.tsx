import { useActions, useTypedSelector } from '@/common/hooks';
import * as S from './styled';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
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
export const optionsSimCard = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sim cards',
    },
  },
};

export const Home = () => {
  const { getAgentOrdersStatis } = useActions();
  const { statistic } = useTypedSelector((state) => state.agentStatistic);
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

  const { active, all, esim, noresident, phisic, process, resident } = statistic || {};

  const data = {
    labels,
    datasets: [
      {
        label: 'Agent',
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 10],
        backgroundColor: '#5800FF',
      },
    ],
  };

  const dataSimCards = {
    labels: ['All', 'Active', 'E-sim', 'No resident', 'Physic', 'Process', 'Resident'],
    datasets: [
      {
        label: 'Sim cards',
        data: [all, active, esim, noresident, phisic, process, resident],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffcd56',
          '#ee0206',
          '#22ff00',
          '#676767',
          '#a67400',
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    getAgentOrdersStatis({ start: '12.01.2024', end: '12.02.2024' });
  }, [getAgentOrdersStatis]);

  return (
    <S.Block>
      <Bar options={options} data={data} />
      <Doughnut options={optionsSimCard} data={dataSimCards} />
    </S.Block>
  );
};
