import { ArrowLeft } from 'lucide-react';
import React from 'react';
import BounceLoader from '../loader/BounceLoader';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';


export const Loader = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center absolute top-0 left-0 z-50 bg-[#dad4d4ed]'>
            <div>
                <BounceLoader />
            </div>
        </div>
    )
}

const PageLayout = (props: {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
}) => {
    const navigate = useNavigate();
    const pathname = useLocation()?.pathname.replace("/", "");
    return (
        <>
            <div className='relative'>
                <div className='flex items-center justify-between gap-5 mb-5'>
                    <div>
                        <h1 className='text-2xl capitalize'>{props?.title || ""}</h1>
                        <p className='text-xs text-gray-500'>{props?.subtitle ? props?.subtitle : `Home / ${pathname?.replaceAll("/", " / ") || ""}`}</p>
                    </div>
                    <div>
                        <Button onClick={() => navigate(-1)} className='flex items-center gap-2 bg-primary-blue-900'>
                            <ArrowLeft size={16} />
                            Go Back
                        </Button>
                    </div>
                </div>
                <div className=''>
                    {props.children}
                    {props?.isLoading && (
                        <Loader />
                    )}
                </div>
            </div>
        </>
    );
};

export default PageLayout;
