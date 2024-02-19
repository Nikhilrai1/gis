import Pagination from "@/components/table/pagination-table/utils/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { FiSearch } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

const MapSidebar = () => {
    const [search, setSearch] = useState<string>("");
    const [showFeatureTable,setShowFeatureTable] = useState<boolean>(false);
    return (
        <div className="bg-primary-blue-900 text-white flex">
            <div className="py-5 px-7">
                <button onClick={() => setShowFeatureTable(prev => !prev)}>
                    <AiOutlineUnorderedList size={30} />
                </button>
            </div>

            {/* map feature sidebar */}
           <div  className={`${showFeatureTable ? "min-w-[250px]" : ""}  p-5  transition ease-in-out transform duration-500  bg-[#000000]  max-w-[450px] flex flex-col gap-5`}>
                {/* search */}
                <div className="flex items-center gap-5 justify-between">
                    <div className={`transition-opacity duration-500 ease-in-out flex items-center gap-1 bg-white rounded-xl p-2`}>
                        <FiSearch
                            size={30}
                            className="rounded cursor-pointer hover:bg-slate-500 text-black"
                            title="Search"
                        />
                        <input className="text-black focus:outline-none" placeholder="search..." />
                    </div>
                    <span>
                        <IoMdSettings color="white" size={30} className="animate-spin" />
                    </span>
                </div>
                <hr />

                {/* content */}
                <div style={{maxHeight: "calc(100vh - 107px - 266px"}}>
                    <ScrollArea className="h-full w-full rounded-md border p-4">
                        Jokester began sneaking into the castle in the middle of the night and leaving
                        jokes all over the place: under the king's pillow, in his soup, even in the
                        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
                        then, one day, the people of the kingdom discovered that the jokes left by
                        Jokester were so funny that they couldn't help but laugh. And once they
                        started laughing, they couldn't stop.
                    </ScrollArea>
                </div>

                {/* pagination */}
                <hr />
             <div className="">
                    <Pagination
                        currentPage={1}
                        hasNextPage={true}
                        hasPrevPage={true}
                        onPageChange={(page: number) => console.log(page)}
                        totalPages={10}
                        />
                </div>
            </div>
        </div>
    )
}

export default MapSidebar