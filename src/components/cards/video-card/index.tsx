import { Card } from '@/components/common/card';
import * as S from './styles';

export const VideoCard = ({ url }: { url: string | unknown }) => {
  return (
    <Card width="600px">
      <S.VideoContiner width="600px" height="240" controls>
        <source width="600px" src={`http://backend.coreteam.uz:8093/api/v1/file/open/${url}`} />
      </S.VideoContiner>
    </Card>
  );
};
