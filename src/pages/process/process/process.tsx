import { useTypedSelector } from '@/common/hooks';
import { SequenceDiagram } from '@/components';
import { ProcessPayload } from './payload/payload';
import { Block } from './styled';

export const ProcessDiagram = () => {
  const { process } = useTypedSelector((s) => s.app);

  return (
    <Block>
      Process
      <SequenceDiagram input={process} />
      <ProcessPayload />
    </Block>
  );
};
