import { Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import { H1, Icon } from '..';

export const PageTitle = ({
  title,
  icon,
  route,
  label,
}: {
  title: string;
  icon: string;
  route: string;
  label: string;
}) => {
  return (
    <Row justify={'space-between'} style={{ margin: '20px 0px' }}>
      <H1>{title}</H1>
      <Button style={{ padding: 0 }}>
        <Link style={{ padding: '10px 20px' }} to={route}>
          {label} <Icon title={icon} name={icon} />
        </Link>
      </Button>
    </Row>
  );
};
