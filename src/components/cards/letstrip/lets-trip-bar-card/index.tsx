import { Card } from '@/components/common/card';
import { ReactNode } from 'react';
export interface IProps {
  children: ReactNode;
}
export const LetsTripBarCard = ({ children }: IProps) => {
  return (
    <Card width="100%" height="100%" color="#ffffffc7">
      {children}
    </Card>
  );
};
