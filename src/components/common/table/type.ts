import { ReactNode } from 'react';

export type TTable = {
  isAdd?: boolean;
  select?: ReactNode;
  path?: string;
  frash?: () => void;
};
