import BounceLoader from '@/components/loader/BounceLoader';
import React from 'react'


export const Loader = () => {
    return (
        <div className='w-full h-[250px] flex items-center justify-center z-50 bg-[#f1ececed]'>
            <div>
                <BounceLoader />
            </div>
        </div>
    )
}

export const TableLayout = (props: {
    children?: React.ReactNode;
    isLoading?: boolean;
}) => {
    return (
            <div>
                <div className=''>
                    {!props?.isLoading && props.children}
                    {props?.isLoading && (
                        <Loader />
                    )}
                </div>
            </div>
    );
};
