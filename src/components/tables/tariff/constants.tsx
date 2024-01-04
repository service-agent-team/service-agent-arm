import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    label: 'Edit',
    key: '1',
    icon: <EditOutlined />,
  },
  {
    label: 'Delete',
    key: '2',
    icon: <DeleteOutlined />,
  },
  {
    label: 'Add Role',
    key: '3',
    icon: <FileAddOutlined />,
  },
  {
    label: 'Add Permission',
    key: '4',
    icon: <FileAddOutlined />,
  },
];
