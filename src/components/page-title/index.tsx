import { Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import { H1, Icon } from '..';

export const PageTitle = ({
  title,
  icon,
  route,
}: {
  title: string;
  icon: string;
  route: string;
}) => {
  return (
    <Row justify={'space-between'} style={{ margin: '20px 0px' }}>
      <H1>{title}</H1>
      <Button>
        <Link to={route}>
          create <Icon title={icon} name={icon} />
        </Link>
      </Button>
    </Row>
  );
};
