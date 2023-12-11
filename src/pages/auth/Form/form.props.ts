import { ReactNode } from 'react';

export interface IFormProps {
  text: string;
  loader: string;
  login: boolean;
  children: ReactNode;
}
