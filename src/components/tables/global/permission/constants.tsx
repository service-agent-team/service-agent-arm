import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { PermissionTableRow } from './types';

export const data: PermissionTableRow[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    permission_id: i,
    permission_name: `Edward King ${i}`,
    permission_description: `user${i}@gmail.com`,
    created_at: `${i}-12-2023`,
    updated_at: `${i}-12-2023`,
    userPermission: [
      {
        user_permission_id: i,
        permission_id: {
          permission_id: i,
          permission_name: `Manage ${i}`,
          permission_description: `Manage ${i}`,
          created_at: `${i}-12-2023`,
          updated_at: `${i}-12-2023`,
        },
        project_id: {
          project_id: i,
          project_name: `Project ${i}`,
          project_description: '',
          status: true,
          created_at: `${i}-12-2023`,
          updated_at: `${i}-12-2023`,
        },
        user_id: {
          user_id: i,
          user_name: `user ${i}`,
          password: '-',
          email: `user${i}@gmail.com`,
          created_at: `${i}-12-2023`,
          updated_at: `${i}-12-2023`,
        },
      },
    ],
  });
}

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
