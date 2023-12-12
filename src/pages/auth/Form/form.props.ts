import { ReactNode } from 'react';
import { IValues } from '../SignIn/types';

export interface IFormProps {
  text: string;
  loader: string;
  login: boolean;
  onFinish: (values: IValues) => void;
  children: ReactNode;
}
