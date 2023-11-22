import { useActions } from '@/libs/hooks/useActions';
import { addNotification } from '@/libs/utils/addNotification';
import { PasswordField, UsernameField } from '@/pages/auth/Fields';
import { AuthForm } from '@/pages/auth/Form';
import { authLoadings } from '@/pages/auth/constants';
import { authDictionary } from '@/pages/auth/dictionary';
import { Typography } from 'antd';
import { IValues } from './sign-in.interface';

export const SignIn = () => {
  const { SignIn } = useActions();
  const login = { email: 'mke@gmail.com', password: '1234567a' };

  const handleFinish = async (values: IValues) => {
    SignIn({
      email: values.email,
      password: values.password,
      callback: () => {
        addNotification('Successfully logged In');
      },
    });
  };

  return (
    <AuthForm login loader={authLoadings.sign} text={authDictionary.signIn} onFinish={handleFinish}>
      <Typography.Title style={{ textAlign: 'center', marginBottom: '50px' }}>
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
  );
};
