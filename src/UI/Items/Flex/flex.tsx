/* eslint-disable prettier/prettier */
import { Flex } from "antd"
import { ReactNode } from "react"
export function Flexs({ ...props }: { props: any; children: ReactNode }) {
    return (<Flex {...props}>
        {props.children}
    </Flex>)
}