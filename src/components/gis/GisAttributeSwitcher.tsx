import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, ListFilter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useGetCollectionAttributeMutation, useUpdateGisAttributeKeyMutation } from "@/redux/features/gis-data/gisApi"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { initGisAttribute } from "@/redux/features/gis-data/gisDataSlice"
import BounceLoader from "../loader/BounceLoader"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface SwitcherProps extends PopoverTriggerProps {
}


const GisAttributeSwitcher = ({ className }: SwitcherProps) => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch();
    const { gisAttribute } = useAppSelector(state => state.gis);
    const [updateGisAttribute] = useUpdateGisAttributeKeyMutation();
    const { gisData } = useAppSelector(state => state.gis);


    const onGisAttributeSwitch = (attr: string) => {
        updateGisAttribute({
            id: gisData?.id || "",
            property_label_key: attr
        })
        dispatch(initGisAttribute(attr))
        setOpen(false);
    }

    const [getCollectionAttributes, { data: attributes, isLoading: fetchLoading }] = useGetCollectionAttributeMutation();


    // USEEFFECT
    useEffect(() => {
        getCollectionAttributes({ collection: gisData?.properties_col_name || "" })
    }, [gisData?.properties_col_name])



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button disabled={fetchLoading} variant={"outline"} size={"sm"} role="combobox" aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between text-black", className)}>
                    {(fetchLoading) ? <BounceLoader /> : (
                        <>
                            {gisAttribute ? gisAttribute : "Select Gis Attribute"}
                        </>
                    )}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search file..." />
                        <CommandEmpty>No Gis Attribute Found.</CommandEmpty>
                        <CommandGroup heading="Gis Attribute">
                            {attributes && attributes?.length > 0 && attributes?.map((attr, i) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => onGisAttributeSwitch(attr)}
                                    className="text-sm"
                                >
                                    <ListFilter className="mr-2 h-4 w-4" />
                                    {attr}
                                    <Check
                                        className={cn("ml-auto h-4 w-4", gisAttribute === attr ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default GisAttributeSwitcher