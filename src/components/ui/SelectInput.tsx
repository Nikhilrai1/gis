"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Delete } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface OptionType {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: OptionType[];
    onSelect: (option: OptionType) => void;
    defaultValue?: string;
    placeholder?: string;
    className?: string;
}


export const SelectInput: React.FC<SelectInputProps> = ({ options, onSelect, className, placeholder, defaultValue }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue || "")

    const handleSelect = (currentValue: string) => {
        const option = options.find(el => el.value.toLowerCase() === currentValue.toLowerCase());
        if (option) {
            onSelect(option);
        }
        setValue(currentValue)
        setOpen(false)
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={cn("w-full", className)}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? <p className="capitalize">
                            {options.find((option) => option.value.toLocaleLowerCase() === value.toLowerCase())?.label}
                        </p>
                        : <p className="text-gray-500 text-xs capitalize">{placeholder}</p>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className="w-full">
                    <CommandInput placeholder="Search option..." className="w-full" />
                    <CommandEmpty className="w-full">No option found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[200px] w-full">
                        {options?.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={handleSelect}
                                className="w-full"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4 text-green-500",
                                        value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

interface ChipSelectInputProps extends Omit<SelectInputProps, "defaultValue" | "onSelect"> {
    defaultValues?: OptionType[];
    onSelect: (option: OptionType[]) => void;
}
export const ChipSelectInput: React.FC<ChipSelectInputProps> = ({ options, onSelect, className, placeholder, defaultValues }) => {
    const [open, setOpen] = React.useState(false)
    const [values, setValues] = React.useState<OptionType[]>(defaultValues || []);



    const handleSelect = (currentValue: string) => {
        const option = options.find(el => el.value.toLowerCase() === currentValue.toLowerCase());
        if (option) {
            onSelect(values.concat(option));
            setValues(prev => {
                if (prev.find(el => el.value === option.value)) {
                    return prev;
                }
                return [...prev, option];
            });
            setOpen(false)
        }
    }

    const handleRemoveChip = (value: string) => {
        setValues(prev => prev.filter(el => el.value !== value));
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={cn("w-full", className)}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-fit"
                >
                    {(values && values?.length > 0)
                        ? (
                            <div className="flex gap-2 flex-wrap">
                                {values.map((val, index) => (
                                    <p key={index} className="capitalize bg-slate-200 text-primary-blue-900 p-1 rounded-md text-xs flex items-center gap-2">
                                        {val.label}
                                        <button
                                            onClick={() => handleRemoveChip(val.value)}
                                            className=""
                                        >
                                            <Delete className="h-4 w-4 text-red-500" />
                                        </button>
                                    </p>
                                ))}
                            </div>
                        )
                        : <p className="text-gray-500 text-xs capitalize">{placeholder}</p>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className="w-full">
                    <CommandInput placeholder="Search option..." className="w-full" />
                    <CommandEmpty className="w-full">No option found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[200px] w-full">
                        {options?.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={handleSelect}
                                className="w-full"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4 text-green-500",
                                        values.includes(option) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
