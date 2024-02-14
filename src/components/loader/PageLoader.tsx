import BounceLoader from "./BounceLoader"

export const PageLoader = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center z-50 bg-[#f1ececed]'>
            <div>
                <div className="bg-primary-blue-900 flex items-center justify-center">
                    <img
                        src="/loader_logo.png"
                        alt="Nep Gis logo"
                        className="h-fit w-fit object-contain"
                    />
                </div>
                <BounceLoader />
            </div>
        </div>
    )
}