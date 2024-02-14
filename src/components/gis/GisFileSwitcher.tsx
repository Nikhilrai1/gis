"use client"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { useGetAllGisFileQuery, useLazyGetSingleGisFileJsonQuery } from "@/redux/features/gis-data/gisApi"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { FaRegFileZipper } from "react-icons/fa6";
import { GisData, initGisFileData } from "@/redux/features/gis-data/gisDataSlice"
import { showToast } from "@/lib/Toast"
import { ErrorPayload } from "@/typing"
import BounceLoader from "../loader/BounceLoader"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
}


const GisFileSwitcher = ({ className }: StoreSwitcherProps) => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch();
    const { gisData: currGisData } = useAppSelector(state => state.gis);
    const [getGisFileJson, { isLoading: fetchGisJsonLoading, isFetching: fetchingGisJson }] = useLazyGetSingleGisFileJsonQuery();
    const { data } = useGetAllGisFileQuery({
        params: {
            page: 1,
            per_page: 10,
            search: ""
        }
    });

    const onGisFileSwitch = (gisData: GisData) => {
        getGisFileJson({ id: `${gisData?.id || ""}` })
            .unwrap().then((data) => {
                dispatch(initGisFileData({
                    id: gisData?.id || "",
                    name: gisData?.name || "",
                    geojson: data?.results
                }))
            }).catch((err: ErrorPayload) => {
                err?.data?.errors.map(el => {
                    showToast(el.message, {
                        type: "error",
                    })
                })
            })

        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button disabled={fetchGisJsonLoading} variant={"outline"} size={"sm"} role="combobox" aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between text-black", className)}>
                    {(fetchGisJsonLoading || fetchingGisJson) ? <BounceLoader /> : (
                        <>
                            <FaRegFileZipper className="m-2 h-4 w-4" />
                            {currGisData?.name ? currGisData.name : "Select File"}
                        </>
                    )}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search file..." />
                        <CommandEmpty>No Gis Data Found.</CommandEmpty>
                        <CommandGroup heading="Gis Files">
                            {data?.results && data?.results?.map((gisData) => (
                                <CommandItem
                                    key={gisData.id}
                                    onSelect={() => onGisFileSwitch(gisData)}
                                    className="text-sm"
                                >
                                    <FaRegFileZipper className="mr-2 h-4 w-4" />
                                    {gisData.name}
                                    <Check
                                        className={cn("ml-auto h-4 w-4", currGisData?.id === gisData.id ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Add Gis File
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default GisFileSwitcher