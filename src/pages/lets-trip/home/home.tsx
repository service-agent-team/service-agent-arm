import { LetsTripBarCard, LetstripMiniCard } from '@/components';
import { useActions } from '@/hooks';
import { Col, Row } from 'antd';
import {
  BarElement,
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
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Barcha oylik',
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
      label: 'Tour',
      data: [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#5800FF',
      borderColor: '#5800FF',
      borderWidth: 4,
    },
    {
      label: 'Transfer',
      data: [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#34e124',
      borderColor: '#34e124',
      borderWidth: 4,
    },
    {
      label: 'Luggage delivery',
      data: [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#e67c1f',
      borderColor: '#e67c1f',
      borderWidth: 4,
    },
  ],
};

export const LetsTripHome = () => {
  const { getAgentOrdersStatis } = useActions();
  useEffect(() => {
    getAgentOrdersStatis({ start: '12.01.2024', end: '12.02.2024' });
  }, [getAgentOrdersStatis]);

  return (
    <div>
      <Row gutter={5}>
        <Col span={8}>
          <LetstripMiniCard title="All users" name="15" />
        </Col>
        <Col span={8}>
          <LetstripMiniCard title="Active users" name="5" />
        </Col>
        <Col span={8}>
          <LetstripMiniCard title="Barcha buyurtmalar" name="5" />
        </Col>
      </Row>
      <LetsTripBarCard>
        <Line width="600" height="400" options={options} data={data} />;
      </LetsTripBarCard>
    </div>
  );
};
