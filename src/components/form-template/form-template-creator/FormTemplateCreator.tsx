import { DynamicFormFieldI } from "@/redux/features/gis-form-template/gis-form-template";
import { v4 as uuidV4 } from "uuid";
import { Plus, Trash } from 'lucide-react';
import { SelectInput } from "@/components/ui/SelectInput";
import ChipInput from "@/components/ui/ChipInput";
import CustomCheckbox from "@/components/ui/CheckboxInput";
import { SelectTypeI } from "@/typing";
import { formFieldsOptions } from "@/utils/constants";

interface FormFieldCreatorProps {
    formFields: DynamicFormFieldI[],
    setFormFields: (form: DynamicFormFieldI[]) => void;
}


const FormFieldCreator = ({ formFields, setFormFields }: FormFieldCreatorProps) => {

    const handleFormFieldChange = (value: string | boolean | SelectTypeI[], id: string, key: keyof DynamicFormFieldI) => {
        const newTableData = formFields.map(el => {
            if (el?.id === id) {
                const newData = {
                    ...el,
                    [key]: value,
                }
                return newData;
            }
            return el;
        })

        setFormFields(newTableData)
    }

    const handleAddFormField = () => {
        // @ts-ignore
        setFormFields((prev: DynamicFormFieldI[]) => [
            ...prev,
            {
                id: uuidV4(),
                form_type: "StringField",
                name: "",
                required: false,
                select_field: null
            }])
    }

    const handleDeleteFormField = (id: string) => {
        const newTable = formFields?.filter(el => el.id !== id);
        setFormFields(newTable)
    }


    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                {formFields?.map((el, i) => (
                    <div key={i} className="flex flex-col gap-2 border rounded-xl bg-white p-2 w-full shadow-xl" >
                        <div className="flex items-center gap-5 w-full" >
                            <div className='text-center border p-1.5 rounded-md flex-1 flex flex-wrap'>
                                <input
                                    className=' focus:outline-none'
                                    value={el.name}
                                    type='text'
                                    required={true}
                                    onChange={(e) => handleFormFieldChange(e.target.value, el?.id as string, "name")}
                                />
                            </div>
                            <div className='text-center  rounded-md'>
                                <SelectInput
                                    onSelect={(option) => handleFormFieldChange(option?.value, el?.id as string, "form_type")}
                                    options={formFieldsOptions}
                                    defaultValue={el?.form_type}
                                    placeholder="Select Field Type"
                                    className=" "
                                />
                            </div>

                            <div className='text-center p-1'>
                                <button
                                    // disabled={i === 0}
                                    // className={`p-[7px] text-white ${i === 0 ? "bg-red-300" : "bg-red-500"}`}
                                    className={`p-[7px] text-white bg-red-500`}
                                    style={{ borderRadius: "5px" }}
                                    onClick={() => handleDeleteFormField(el?.id as string)}
                                >
                                    <Trash size={15} />
                                </button>
                            </div>
                        </div>
                        {el?.form_type === "DropDown" &&
                            <ChipInput
                                onChipChange={(chipValue) => handleFormFieldChange(chipValue as SelectTypeI[], el?.id as string, "select_field")}
                                className="w-full"
                                placeholder="Add Options..."
                            />}
                        <CustomCheckbox
                            label="Required"
                            onCheck={(value) => handleFormFieldChange(value, el?.id as string, "required")}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-end items-center w-full  mt-4'>
                <button
                    type='button'
                    className={`p-[7px] text-white bg-green-500 rounded-md`}
                    onClick={handleAddFormField}
                >
                    <Plus size={15} />
                </button>
            </div>
        </div>

    )
}

export default FormFieldCreator