/* eslint-disable prettier/prettier */
import type { MenuProps } from 'antd';
import { VideoCameraFilled,SettingFilled } from '@ant-design/icons';

export const serviceAgentMenu: MenuProps['items'] = [
    {
        label: "Videos",
        key: "/agent/videos",
        icon: <VideoCameraFilled />
    },
    {
        label: "Settings",
        key: "agnet/settings",
        icon: <SettingFilled />
    }
]