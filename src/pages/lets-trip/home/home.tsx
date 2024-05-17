import { useActions, useTypedSelector } from '@/common/hooks';
import { LetsTripBarCard, LetstripMiniCard } from '@/components';

import { Col, Row } from 'antd';

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
      text: '',
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

export const LetsTripHome = () => {
  const { statistics } = useTypedSelector((state) => state.letsTripStatistic);
  const { getAllLetsTripStatistics } = useActions();
  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: statistics?.monthlyData.map((el) => el.month),
        backgroundColor: '#3a57e8',
        borderColor: '#3a57e8',
        borderWidth: 4,
      },
    ],
  };

  useEffect(() => {
    getAllLetsTripStatistics({ callback() {} });
  }, [getAllLetsTripStatistics]);

  return (
    <div>
      <Row gutter={5}>
        <Col span={8}>
          <LetstripMiniCard
            title="All users"
            name={`${statistics ? statistics.activeUsers + statistics.inactiveUsers : ''}`}
          />
        </Col>
        <Col span={8}>
          <LetstripMiniCard title="Active users" name={`${statistics?.activeUsers}`} />
        </Col>
        <Col span={8}>
          <LetstripMiniCard title="In active users" name={`${statistics?.inactiveUsers}`} />
        </Col>
      </Row>
      <LetsTripBarCard>
        <Line width="1000px" height="550px" options={options} data={data} />
      </LetsTripBarCard>
    </div>
  );
};
