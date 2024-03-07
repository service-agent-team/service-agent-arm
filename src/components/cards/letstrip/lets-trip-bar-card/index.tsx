import { Card } from '@/components/common/card';
import { ReactNode } from 'react';
export interface Iprops {
  children: ReactNode;
}
export const LetsTripBarCard = ({ children }: Iprops) => {
  return (
    <Card width="600px" height="400px" color="#ffffffc7">
      {children}
    </Card>
  );
};
