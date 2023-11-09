/* eslint-disable prettier/prettier */
import { MainLayout } from "@/layouts";
import { serviceAgentMenu } from "@/constants/menus/service-agent";
import { Outlet } from "react-router-dom";
export function ServiceAgentLayout() {
    return (
        <MainLayout items={serviceAgentMenu}>
            <Outlet />
        </MainLayout>
    )
}