"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
        const option = options.find(el => el.value === currentValue);
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
                        ? <p>
                            {options.find((option) => option.value === value)?.label}
                        </p>
                        : <p className="text-gray-500 text-xs">{placeholder}</p>}
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
                                        "mr-2 h-4 w-4",
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
