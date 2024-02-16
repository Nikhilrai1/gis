import { DynamicFormFieldI } from "@/redux/features/gis-form-template/gis-form-template"

interface FormFieldCreatorProps {
    formFields: DynamicFormFieldI[],
    setFormFields: (form: DynamicFormFieldI[]) => void;
}

const formFieldsOptions = [
    { "label": "StringField", "value": "StringField" },
    { "label": "IntegerField", "value": "IntegerField" },
    { "label": "FloatField", "value": "FloatField" },
    { "label": "BooleanField", "value": "BooleanField" },
    { "label": "DateField", "value": "DateField" },
    { "label": "DateTimeField", "value": "DateTimeField" },
    { "label": "TimeField", "value": "TimeField" },
    { "label": "DropDown", "value": "DropDown" }
]


import React from 'react'
import { Plus, Trash } from 'lucide-react';
import { v4 as uuidV4 } from "uuid";
import { SelectInput } from "@/components/ui/SelectInput";
import ChipInput from "@/components/ui/ChipInput";



const FormFieldCreator = ({ formFields, setFormFields }: FormFieldCreatorProps) => {
    console.log(formFields)
    // const handleTableInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, key: keyof BreakPeriod) => {
    //     const newTableData = table.map(el => {
    //         if (el?.id === id) {
    //             const newData = {
    //                 ...el,
    //                 [key]: e.target.value,
    //             }
    //             return newData;
    //         }
    //         return el;
    //     })

    //     setTable(newTableData)
    // }



    // const handleAddBreakPeriod = () => {
    //     //@ts-ignore
    //     setTable((prev) => [
    //         ...prev, {
    //             id: uuidV4(),
    //             period_no: "",
    //             period_duration: "",
    //         }]
    //     )
    // }

    // const handleDeleteBreakPeriod = (id: string) => {
    //     const newTable = table?.filter(el => el.id !== id);
    //     setTable(newTable)
    // }

    return (
        <div className='w-fit max-w-[400px]'>
            <div>
                {formFields?.map((el, i) => (
                    <div key={i} className="flex flex-col gap-2 border p-2 w-fit" >
                        <div className="flex items-center gap-5 " >
                            <div className='text-center border p-1.5 rounded-md'>
                                <input
                                    className='max-w-[200px] min-w-[200px] focus:outline-none'
                                    value={el.name}
                                    type='text'
                                    required={true}
                                    onChange={(e) => {
                                        { }
                                    }}
                                />
                            </div>
                            <div className='text-center  rounded-md'>
                                <SelectInput
                                    onSelect={() => { }}
                                    options={formFieldsOptions}
                                    defaultValue={el?.name}
                                    placeholder="Select Field Type"
                                    className="max-w-[200px] min-w-[200px] "
                                />
                            </div>

                            {<div className='text-center p-1'>
                                <button
                                    className={`p-[7px] text-white bg-red-500`}
                                    style={{ borderRadius: "5px" }}
                                    onClick={() => { }}
                                >
                                    <Trash size={15} />
                                </button>
                            </div>
                            }
                      
                        </div>
                        <ChipInput onChipAdd={() => { }} className="w-full" placeholder="Add Options..." />
                    </div>
                ))}
            </div>
            <div className='flex justify-end items-center w-full  mt-4'>
                <button
                    type='button'
                    className={`p-[7px] text-white bg-green-500 rounded-md`}
                    onClick={() => { }}
                >
                    <Plus size={15} />
                </button>
            </div>
        </div>

    )
}

export default FormFieldCreator