import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useUploadExcelMutation } from "@/redux/features/gis-form-template/gisFormTemplateApi";


interface FormData {
  file: FileList;
}

const ExcelUpload: React.FC = () => {
  const { id } = useParams();
  const { register, handleSubmit ,reset } = useForm<FormData>();
  const [
    uploadExcelMutation,
    { isSuccess: isExcelImportSuccess, isError: isExcelImportFailure },
  ] = useUploadExcelMutation();
  const onSubmit = async (data: FormData) => {
    if (isExcelImportFailure) {
      toast.error("Please select valid excel file");
    }
    const formData = new FormData();
    formData.append("file", data.file[0]);
    //@ts-ignore
    await uploadExcelMutation({ customFormId: id, data: formData });
    reset();
    
  };

  useEffect(() => {
    if (isExcelImportSuccess) {
      toast.success("Excel file Uploaded Successfully");
      
    }
  }, [isExcelImportSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-primary-blue-900 px-16 py-8 rounded border border-solid border-slate-300">
       
        <p className="text-xl">Upload your Excel file </p>
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Choose File:
          </label>
          <input
            type="file"
            id="file"
            {...register("file", { required: "File is required" })}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-primary-blue-900 text-white px-4 py-2 rounded-md hover:bg-primary-blue-600 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExcelUpload;
