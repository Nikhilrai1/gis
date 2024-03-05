import { Link } from "react-router-dom";


interface PageHeaderProps {
    title: string;
    subTitle?: string;
    buttonName?: string | null
    buttonClick?: () => void;
    link?: string | null;
    linkTitle?: string | null;
}
const PageHeader = ({ title, subTitle, linkTitle, link, buttonName, buttonClick }: PageHeaderProps) => {
    return (
        <div className={`flex flex-wrap items-start justify-between gap-5`} >
            <div>
                <h1 className="font-bold text-2xl text-theme">{title}</h1>
                {subTitle && <p className="text-xs">{subTitle}</p>}
            </div>
            <div>
                {buttonName && <button onClick={() => buttonClick ? buttonClick() : {}} className='flex items-center text-xs justify-center text-white self-end p-2 bg-primary-blue-900 rounded-md'>
                    {buttonName}
                </button>}


                {linkTitle && <Link to={link as string} className='flex items-center justify-center text-white self-end p-2 bg-themeColor rounded-md bg-primary-blue-900'>
                    {linkTitle}
                </Link>
                }
            </div>
        </div>
    )
}

export default PageHeader