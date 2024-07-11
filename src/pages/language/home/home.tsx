import { useActions } from '@/common/hooks';
import { Icon, modal } from '@/components';
import { ROUTES } from '@/constants';
import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';

export const LanguageHome = () => {
  const { logout } = useActions();
  const navigate = useNavigate();
  const handleLogout = () => {
    modal.confirm({
      title: 'Logout ?',
      okText: 'Logout',
      onOk() {
        logout();
      },
      cancelText: 'Cancel',
    });
  };

  return (
    <div>
      <iframe
        src="https://language.coreteam.uz"
        width="100%"
        height="100vh"
        title="Let's Trip i18 language project"
        style={{ border: 'none', height: '100vh' }}
      />
      <FloatButton
        type="primary"
        icon={<Icon name="HomeOutlined" />}
        style={{ bottom: 20 }}
        onClick={() => navigate(ROUTES.home)}
      />
      <FloatButton
        type="primary"
        icon={<Icon name="UserOutlined" />}
        style={{ bottom: 80 }}
        onClick={() => handleLogout()}
      />
    </div>
  );
};
