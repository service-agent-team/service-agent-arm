import { useActions, useTypedSelector } from '@/common/hooks';
import { FC, useEffect, useState } from 'react';
// @ts-ignore
import { SequenceDiagram, store, actions, dispatch } from 'sequence-diagram-react';

interface IProps {
  type: 'edit' | 'create';
}

export const ProcessPayload: FC<IProps> = ({ type }: IProps) => {
  const { diagram } = useTypedSelector((s) => s.app);
  const [_, setDiagramState] = useState(store.getState());
  const { setDiagram } = useActions();

  useEffect(() => {
    if (type === 'edit' && diagram) {
      dispatch(actions.replaceCore(diagram.objects, diagram.messages));
    }
  }, [diagram]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setDiagramState(store.getState());
    });

    setDiagram(store.getState().core.present);

    return () => {
      unsubscribe();
    };
  }, []);

  return <SequenceDiagram />;
};
