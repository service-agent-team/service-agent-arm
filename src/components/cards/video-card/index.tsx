import { Card } from '@/components/common/card';
import * as S from './styles';
import { Divider, List, Typography } from 'antd';
import { useTypedSelector } from '@/libs';

export const VideoCard = () => {
  const { agent } = useTypedSelector((state) => state.agent);
  console.log(agent);
  return (
    <Card width="600px">
      <S.VideoContiner width="600px" height="240" controls>
        <source
          width="600px"
          src={`http://backend.coreteam.uz:8093/api/v1/file/open/${agent?.videoContentId}`}
        />
      </S.VideoContiner>
    </Card>
  );
};
