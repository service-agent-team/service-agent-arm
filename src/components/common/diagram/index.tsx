import Sequence from 'react-sequence-diagram';

interface Props {
  input: string;
  theme?: 'hand' | 'simple';
}

export const SequenceDiagram = ({ input, theme }: Props) => {
  return <Sequence input={input} options={{ theme: theme || 'simple' }} />;
};
