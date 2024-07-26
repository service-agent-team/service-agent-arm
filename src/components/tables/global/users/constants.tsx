import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { UserTableRow } from './types';

export const data: UserTableRow[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    user_id: i,
    user_name: `Edward King ${i}`,
    email: `user${i}@gmail.com`,
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
      },
    ],
    userRoles: [
      {
        user_roles_id: i,
        user_role_name: `admin ${i}`,
        user_role_description: 'Something',
        role_id: {
          role_id: i,
          role_name: `superadmin ${i}`,
          description: 'thin access,read manage',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        },
      },
      {
        user_roles_id: i,
        user_role_name: `admin ${i}`,
        user_role_description: 'Something',
        role_id: {
          role_id: i,
          role_name: `admin ${i}`,
          description: 'thin access,read manage',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
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
