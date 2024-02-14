
import {  GripVertical } from 'lucide-react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dashboardNavItems } from '../navbar/DashboardNavItems';

const AuthSidebar = () => {
    const [isResize, setIsResize] = useState(true);
    const pathname = useLocation()?.pathname;
    return (
        <div className={`shadow-md ${isResize && "md:w-[300px]"} sidebar-height sticky top-0 left-0 z-50 bg-primary-blue-900`}>
            <div className='relative py-5 px-7 h-full'>
                <button onClick={() => setIsResize(prev => !prev)} className='absolute top-[48%] -right-3 pt-1 pb-1 rounded-full bg-primary-blue-900 text-white'>
                    <GripVertical />
                </button>
                <div className='flex flex-col gap-5'>
                    <div className="flex w-full flex-1 flex-col gap-6">
                        {dashboardNavItems.map((link) => {
                            const isActive = pathname.includes(link.name) && link.path.length > 1 || pathname === link.path;
                            const Icon = link.icon;
                            return (
                                <Link to={link.path} key={link.name} className={`flex items-center text-white p-3 gap-5 rounded-xl ${isActive && "bg-gray-500"}`}>
                                    <span>
                                        <Icon size={20} />
                                    </span>
                                    <p className="hidden md:block text-sm whitespace-nowrap">{link.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthSidebar