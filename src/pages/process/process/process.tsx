import { useTypedSelector } from '@/common/hooks';
import { SequenceDiagram } from '@/components';
import { ProcessPayload } from './payload/payload';
import { Block } from './styled';

export const ProcessHome = () => {
  const { process } = useTypedSelector((s) => s.app);

  return (
    <Block>
      ProcessHome
      <SequenceDiagram input={process} />
      <ProcessPayload />
    </Block>
  );
};
