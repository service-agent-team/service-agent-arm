/* eslint-disable prettier/prettier */
import { MainLayout } from "@/layouts";
import { ussdMenu } from "@/constants/menus";
import { Outlet } from "react-router-dom";

export function UssdLayout() {
    return (
        <MainLayout items={ussdMenu}>
            <Outlet />
        </MainLayout>
    )
}