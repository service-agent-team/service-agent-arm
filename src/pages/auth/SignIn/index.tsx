import { history } from '@/libs';
import { useActions } from '@/libs/hooks/use-actions';
import { addNotification } from '@/libs/utils/addNotification';
import { PasswordField, UsernameField } from '@/pages/auth/Fields';
import { AuthForm } from '@/pages/auth/Form';
import { authLoadings } from '@/pages/auth/constants';
import { authDictionary } from '@/pages/auth/dictionary';
<<<<<<< HEAD
import { IAuthResponse } from '@/store/auth/interface';
=======
import { IAuthResponse } from '@/store/auth/auth.interface';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IValues } from './sign-in.interface';

export const SignIn = () => {
  const { SignIn } = useActions();
  const login = { email: 'mke@gmail.com', password: '1234567a' };
  const navigate = useNavigate();

  const handleFinish = async (values: IValues) => {
    SignIn({
      email: values.email,
      password: values.password,
      callback: (data: IAuthResponse) => {
        addNotification('Successfully logged In');
        if (data.success) {
          switch (data.data.role) {
            case 'superadmin':
              history.push('/');
              break;
            case 'admin':
              navigate('/agent');
              break;
            default:
              break;
          }
        }
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
