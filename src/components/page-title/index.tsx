import { Button, Row, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
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
  icon?: string;
  route?: string;
  label?: string;
  children?: ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <Row justify={'space-between'} style={{ margin: '20px 0px' }}>
      <H1>{title}</H1>
      <Space>
        {children}
        <Button
          type="primary"
          style={{ padding: 0 }}
          onClick={() => {
            if (!route) navigate(-1);
          }}
        >
          {route && icon ? (
            <Link style={{ padding: '10px 20px' }} to={route}>
              {label} <Icon title={icon} name={icon} />
            </Link>
          ) : (
            <div style={{ padding: '8px 20px' }}>
              {'Back'} <Icon title={'ArrowLeftOutlined'} name={'ArrowLeftOutlined'} />
            </div>
          )}
        </Button>
      </Space>
    </Row>
  );
};
