/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { Rows, Cols } from "@/UI"
import { useActions, useTypedSelector } from "@/libs/hooks";
import { addNotification } from '@/libs/utils/addNotification';
export default function Agents() {
    const { getAllUsers } = useActions()
    useEffect(() => {
        getAllUsers({
            callback: () => {
                addNotification('Success');
            },
        })
    }, [])

    const { data } = useTypedSelector(state => state.contract)

    return (
        <Rows>
            {data && data.map((el, i) => (<Cols key={i} span={4}>{el.firstName}</Cols>))}
        </Rows>
    )
}
