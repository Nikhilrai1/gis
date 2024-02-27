
import { Tooltip } from "@/components/ui/tooltip";
import { Cross, Filter, Search, XSquare } from "lucide-react";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";


interface SearchFilterProps {
    isFilterMode: boolean;
    setIsFilterMode: any;
    onTableSearch: (val: string) => void;
    onTableClear: () => void;
    onDownload?: () => void;
    onUpload?: () => void;
}

const SearchFilter = ({ isFilterMode, setIsFilterMode, onTableSearch, onTableClear, onDownload, onUpload }: SearchFilterProps) => {
    const [searchVal, setSearchVal] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>(false);

    // Event handlers
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onTableSearch(searchVal);
            setIsSearch(true)
        }
    };


    return (
        <div className="w-full flex flex-wrap items-start justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-5">
                <button onClick={() => setIsFilterMode((prev: boolean) => !prev)} className={`filter-button p-2 ${isFilterMode ? "bg-red-500" : "bg-primary-blue-900"} rounded-md`}>
                    {isFilterMode ? <Cross size={30} className="text-white" />
                        : <Filter size={30} className="text-white" />}
                </button>
                <div className=" flex items-center justify-center gap-3 border border-gray-400 px-3 py-2 rounded-md bg-white ">
                    <div className="flex items-center justify-center">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="outline-none font-serif "
                        placeholder={"Search..."}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
                {onUpload && <button onClick={onUpload} className="w-[32px] h-[32px] bg-green-500 rounded-md p-1 flex items-center justify-center">
                    <Tooltip label={"Excel Upload"}>
                        <RiFileExcel2Fill size={30} className="text-white" />
                    </Tooltip>
                </button>}
                {onDownload && <button onClick={onDownload} className="w-[32px] h-[32px] bg-green-500 p-1 rounded-md flex items-center justify-center">
                    <Tooltip label={"Download"}>
                        <FaFileDownload size={21} className="text-white" />
                    </Tooltip>
                </button>}
                {(isFilterMode || (searchVal !== "" && isSearch)) && <button onClick={() => onTableClear()} className={`filter-button p-2 rounded-md`}>
                    <XSquare size={30} className="text-red-500" />
                </button>}
            </div>
            <div>
            </div>
        </div >
    )
}

export default SearchFilter