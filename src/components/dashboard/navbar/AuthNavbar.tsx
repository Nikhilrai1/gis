import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { CgMenuGridO } from "react-icons/cg";
import { IconType } from "react-icons";
import ProfileIcon from "./ProfileIcon";
import { dashboardNavItems } from "./DashboardNavItems";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import GisFileSwitcher from "@/components/gis/GisFileSwitcher";
import { Modal } from "@/components/modal/Modal";
import GisFileUpload from "@/components/gis/GisFileUpload";

const AuthNavbar = () => {
    const navigate = useNavigate();
    const menuContainer = useRef(null);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // STATE
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
    const { authUser } = useAppSelector(state => state.auth);


    // USEEFFECT
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // @ts-expect-error menuContainer.current have 'contains' property
            if (!menuContainer?.current?.contains(event.target)) {
                if (!showProfileMenu && !showNavMenu) return;
                setShowProfileMenu(false);
                setShowNavMenu(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [showProfileMenu, showNavMenu, menuContainer]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (!showProfileMenu) return;

            if (event.key === "Escape") {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [showProfileMenu]);

    // HELPER FUNCTION
    const LogoutHandler = () => {
        dispatch(logout());
        navigate("/home");
    };

    return (
        <nav
            className={`fixed top-0 left-0  h-[107px] text-white bg-primary-blue-900  z-[20] flex justify-between items-center p-7 w-full`}
        >
            <Link to="/home">
                <img
                    src="/nep-gis-logo.png"
                    alt="Nep Gis logo"
                    className="h-[123px] w-[156px]"
                />
            </Link>
            <div className="flex gap-8 items-center" ref={menuContainer}>
                <GisFileSwitcher onSwitch={() => setModalOpen(true)} />
                <CgMenuGridO
                    size={50}
                    className="cursor-pointer p-2 rounded-full hover:bg-slate-700"
                    onClick={() => {
                        setShowNavMenu((prevState) => !prevState);
                        setShowProfileMenu(false);
                    }}
                />
                <ProfileIcon
                    name={authUser?.first_name[0] as string || ""}
                    onClick={() => {
                        setShowProfileMenu((prevState) => !prevState);
                        setShowNavMenu(false);
                    }}
                    otherStyles="hover:bg-slate-300 transition-colors duration-200 ease-in-out h-12 w-12"
                />
            </div>
            <div
                className={`py-2 bg-white text-black dropDownNavMenu ${showNavMenu ? "block" : "!hidden"
                    } `}
            >
                <div className="w-full p-8 flex gap-8 flex-wrap">
                    {dashboardNavItems.map((menu, idx) => {
                        const Icon: IconType = menu.icon;
                        const activeBg = pathname.includes(menu.path)
                            ? "bg-slate-900 text-white"
                            : "bg-slate-200 hover:bg-slate-400";
                        return (
                            <div className="flex flex-col items-center" key={idx}>
                                <Link
                                    to={menu.path}
                                    className={` flex items-center justify-center p-2 rounded-full ${activeBg}   cursor-pointer`}
                                >
                                    {" "}
                                    {<Icon size={25} />}
                                </Link>
                                <span className="text-base leading-xl font-normal">
                                    {menu.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={` pt-3 pb-2 bg-white text-primary-blue-900 ${showProfileMenu ? "block" : "hidden"
                    } dropDownProfileMenu`}
            >
                <div className=" pt-2 pb-3 mb-1  px-5 border-b border-solid border-slate-300 flex items-center gap-2  ">
                    <div className="flex-1">
                        <ProfileIcon name={authUser?.first_name[0] as string || ""} onClick={() => { }} />
                    </div>
                    <div className="flex flex-col ">
                        <span className="font-[400] capitalize text-sm">{authUser?.first_name || ""} {authUser?.last_name || ""}</span>
                        <span className="font-[400]  text-sm">{authUser?.email || ""}</span>
                    </div>
                </div>
                <p
                    className=" py-2  font-medium px-5  cursor-pointer hover:bg-primary-gray-150"
                    onClick={() => LogoutHandler()}
                >
                    Log out
                </p>
            </div>
            <Modal
                title="Upload Gis File"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            >
                <GisFileUpload setModalOpen={setModalOpen} />
            </Modal>
        </nav>
    );
};

export default AuthNavbar;
