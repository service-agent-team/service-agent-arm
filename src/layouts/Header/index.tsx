import { useTypedSelector } from '@/libs/hooks';
import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user } = useTypedSelector((state) => state.auth);

  return (
    <Layout.Header>
      <div className="layout__head">
        <p className="layout__head__logo">SERVICE AGENT</p>
        <ul className="layout__head__nav">
          <Link to={`/projects/${user?.role}`} className="layout__head__nav__link">
            projects
          </Link>
          <div className="layout__head__nav__account">
            <UserOutlined />
          </div>
        </ul>
      </div>
    </Layout.Header>
  );
};
