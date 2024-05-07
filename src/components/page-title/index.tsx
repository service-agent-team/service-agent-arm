import { Button, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { H1, Icon } from '..';
import { ReactNode } from 'react';

export const PageTitle = ({
  title,
  icon,
  route,
  label,
  children,
}: {
  title: string;
  icon: string;
  route: string;
  label: string;
  children?: ReactNode;
}) => {
  return (
    <Row justify={'space-between'} style={{ margin: '20px 0px' }}>
      <H1>{title}</H1>
      <Space>
        {children}
        <Button style={{ padding: 0 }}>
          <Link style={{ padding: '10px 20px' }} to={route}>
            {label} <Icon title={icon} name={icon} />
          </Link>
        </Button>
      </Space>
    </Row>
  );
};
