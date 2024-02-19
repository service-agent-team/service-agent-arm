import styled from 'styled-components';
import { List as AntdList } from 'antd';
const { Item } = AntdList;
const primaryColor = '#7071E8';
const btnColor = '#1976D2';
const listborderColor = '#FEFBF6';

export const Text = styled.p`
  font-size: 25px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  padding: 10px 0px;
  border-radius: 10px;
  /* background-color: ${primaryColor}; */
`;

export const List = styled(AntdList)`
  .ant-list {
    width: 100%;
  }
  &.ant-list-item {
    border-bottom: ${listborderColor};
  }
`;

export const ListItem = styled(Item)`
  .ant-list-item {
    border-bottom: ${listborderColor};
  }
`;
