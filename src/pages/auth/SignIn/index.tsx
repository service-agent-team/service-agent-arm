import { useActions } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { PasswordField, UsernameField } from '@/pages/auth/Fields';
import { AuthForm } from '@/pages/auth/Form';
import { authLoadings } from '@/pages/auth/constants';
import { authDictionary } from '@/pages/auth/dictionary';
import { IAuthResponse } from '@/store';
import { Typography } from 'antd';
import { IValues } from './types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { Card } from '@/components/common/card';

export const SignIn = () => {
  const { SignIn } = useActions();
  const login = { email: '', password: '' };
  const navigate = useNavigate();

  const handleFinish = async (values: IValues) => {
    try {
      SignIn({
        email: values.email,
        password: values.password,
        callback: (_: IAuthResponse) => {
          addNotification('Successfully logged In');
        },
      });
    } catch {
      return navigate(ROUTES.login);
    }
  };

  return (
    <Card width="100">
      <AuthForm
        login
        loader={authLoadings.sign}
        onFinish={handleFinish}
        text={authDictionary.signIn}
      >
        <Typography.Title
          style={{ textAlign: 'center', marginBottom: '50px', textTransform: 'uppercase' }}
        >
          {authDictionary.logintitle}
        </Typography.Title>

        <UsernameField
          value={login.email}
          label={authDictionary.loginEmail}
          placeholder={authDictionary.loginPlaceholder}
        />

        <PasswordField
          name="password"
          value={login.password}
          label={authDictionary.password}
          placeholder={authDictionary.passwordPlaceholder}
        />
      </AuthForm>
    </Card>
  );
};
