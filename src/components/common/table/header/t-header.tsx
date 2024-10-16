import { ROUTES, dictionary } from '@/constants';
import { SearchOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { Add } from '../../add';
import { Input } from '../../inputs';
import type { TTable } from '../type';
import { Box } from '../styles';

export const Header = ({ isAdd, select, path, onClick }: TTable) => {
  return (
    <Flex justify={select ? 'unset' : 'space-between'} gap="middle">
      <Input style={{ width: 300 }} suffix={<SearchOutlined />} placeholder={dictionary.search} />

      <Box>
        {select && select}
        {!isAdd && <Add onClick={onClick} path={!path ? ROUTES.add : path} />}
      </Box>
    </Flex>
  );
};
