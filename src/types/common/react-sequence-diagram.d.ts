import { FC } from 'react';

interface IOptions {
  theme: 'hand' | 'simple';
}

declare module 'react-sequence-diagram' {
  const Sequence: FC<{ input: string; options?: IOptions }>;
  export default Sequence;
}
