
import { Cross, Filter, Search, XSquare } from "lucide-react";
import { useState } from "react";



interface SearchFilterProps {
    isFilterMode: boolean;
    setIsFilterMode: any;
    onTableSearch: (val: string) => void;
    onTableClear: () => void;
}

const SearchFilter = ({ isFilterMode, setIsFilterMode, onTableSearch, onTableClear }: SearchFilterProps) => {
    const [searchVal, setSearchVal] = useState<string>("");
    const [isSearch,setIsSearch] = useState<boolean>(false);

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
                        <Search size={20} className="text-gray-400"/>
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

            <div className="flex items-start justify-end">
                {(isFilterMode || (searchVal !== "" && isSearch)) && <button onClick={() => onTableClear()} className={`filter-button p-2 bg-red-500 rounded-md`}>
                    <XSquare size={30} className="text-white" />
                </button>}
            </div>
            <div>
            </div>
        </div >
    )
}

export default SearchFilter