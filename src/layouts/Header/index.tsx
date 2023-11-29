import { useActions, useTypedSelector } from '@/libs/hooks';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Modal } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { accountDictionary } from './dictionary';

export const Header = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  const sinOut = () => logout();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Layout.Header>
      <div className="layout__head">
        <p className="layout__head__logo">SERVICE AGENT</p>
        <ul className="layout__head__nav">
          <Link to={`/projects/${user?.role}`} className="layout__head__nav__link">
            projects
          </Link>
          <div className="layout__head__nav__account">
            <Link to={'/'}>
              <UserOutlined />
            </Link>
          </div>
        </ul>
        <p className="layout__head__logo" onClick={changeModal}>
          <LogoutOutlined />
        </p>

        <Modal
          title={accountDictionary.exit}
          open={isModalOpen}
          onOk={sinOut}
          onCancel={changeModal}
        >
          <span>{accountDictionary.logout}</span>
        </Modal>
      </div>
    </Layout.Header>
  );
};
