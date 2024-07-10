import { Card } from '@/components/common/card';
import * as S from './styles';
import { useSearchParams } from 'react-router-dom';

export const VideoCard = () => {
  const [searchParams] = useSearchParams();

  return (
    <Card width="100%">
      <S.VideoContainer width="100%" height="240" controls>
        <source
          width="100%"
          src={`http://backend.coreteam.uz:8093/api/v1/file/open/${searchParams.get('video')}`}
          type="video/mp4"
        />
      </S.VideoContainer>
    </Card>
  );
};
