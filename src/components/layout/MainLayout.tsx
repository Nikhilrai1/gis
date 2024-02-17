import { Outlet } from "react-router-dom";
import AuthNavbar from "../dashboard/navbar/AuthNavbar";
import AuthSidebar from "../dashboard/sidebar/AuthSidebar";
import { useAppSelector } from "@/redux/store";
import GisDataList from "../gis/GisDataList";
import { InitialSelectGisDataModal } from "../modal/InitialSelectGisDataModal";

export default function MainLayout() {
    const { gisData } = useAppSelector(state => state.gis);
    return (
        <main className="w-full font-sans">
            <div className='flex items-start w-full'>
                <div className='w-full'>
                    <AuthNavbar />
                    <div className="flex mt-[107px]">
                       <AuthSidebar />
                        <div className={`w-full ${"p-5 md:p-7 lg:p-10 bg-gray-100"}`}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            {!gisData && <InitialSelectGisDataModal
                title="Select Gis File"
                showCancelButton={false}
                className="max-w-[800px]"
            >
                <GisDataList />
            </InitialSelectGisDataModal>}
        </main>
    )
}
