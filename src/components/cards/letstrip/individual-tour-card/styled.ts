import { Card } from '@/components/common/card';
import { Image } from 'antd';
import styled from 'styled-components';
const primaryColor = '#7071E8';
const { PreviewGroup } = Image;

export const Text = styled.p`
  font-size: 17px;
  text-transform: uppercase;
  color: ${primaryColor};
  text-align: center;
`;

export const VideoContainer = styled.video`
  width: 600px;
  height: 450px;
`;

export const ImageBlock = styled.div`
  position: relative;
  width: 100% !important;
`;

export const CustomImageGroup = styled(PreviewGroup)`
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;

export const CustomImage = styled(Image)`
  box-sizing: border-box;
  max-width: 100% !important;
  height: 400px !important;
  background-position: center center;
  background-repeat: no-repeat;

  & .ant-image-img {
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const Title = styled.p`
  position: absolute;
  top: 156px;
  left: 120px;
  display: block;
  max-width: 633px;
  width: 100%;
  color: #ffffff;
  font-size: 42px;
  line-height: 48px;
`;

export const InfoCard = styled(Card)`
  position: absolute !important;
  bottom: -90px;
  right: 100px;
  z-index: 999;
  align-items: start !important;
  background-color: #ffffff !important;
`;

export const CustomCard = styled(Card)`
  display: block;

  & .ant-list-item {
    display: block !important;
  }
`;
