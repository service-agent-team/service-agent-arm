/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { Rows, Cols } from "@/UI"
import { useActions } from "@/libs/hooks";
import { Typography } from 'antd';
import { addNotification } from '@/libs/utils/addNotification';
const { Title } = Typography;
export default function Agents() {
    const { getAllUsers } = useActions()
    useEffect(() => {
        getAllUsers({
            callback: () => {
                console.log('users::::')
                addNotification('Success');
            },
        })
    }, [])

    return (
        <Rows>

        </Rows>
    )
}