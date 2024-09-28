import { useTypedSelector } from '@/common/hooks';
import { SequenceDiagram } from '@/components';
import { ProcessPayload } from './payload/payload';
import { Block } from './styled';

export const ProcessDiagram = () => {
  const { diagram } = useTypedSelector((s) => s.app);

  return (
    <Block>
      Process
      <SequenceDiagram input={diagram} />
      <ProcessPayload />
    </Block>
  );
};
