import React, { useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IconType } from "react-icons";
import { Trash } from "lucide-react";

interface FileUploadProps {
    label: string;
    name: string;
    required?: boolean;
    error?: string;
    register: UseFormRegister<FieldValues>;
    value?: File | null;
    onChange?: (val: File | null) => void;
    fileUrl?: string;
    icon?: IconType;
}

const FileUpload: React.FC<FileUploadProps> = ({
    label,
    name,
    register,
    required = false,
    error,
    value,
    fileUrl,
    onChange: onFileUploadHandler,
    icon,
}) => {
    const Icon = icon || IoMdAdd;

    const [upoadedFile, setUploadedFile] = useState<File | null>(null);
    const acceptFileTypes = "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/zip";

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            !!onFileUploadHandler && onFileUploadHandler(file);
            setUploadedFile(file);
        } else {
            setUploadedFile(null);
            !!onFileUploadHandler && onFileUploadHandler(null);
        }
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUploadedFile(null);
        !!onFileUploadHandler && onFileUploadHandler(null);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label>
                    {label} {required ? <span className="text-red-600">*</span> : null}
                </label>
            )}

            {upoadedFile || value || fileUrl ? (
                <>
                    <label className=" flex items-center justify-center w-32 p-5 border-solid border  border-gray-300 rounded-md cursor-pointer">
                        <label htmlFor={name} className="relative h-full w-full">
                            <FaFileArchive
                                onClick={(e: any) => e.preventDefault()}
                                className="h-full w-full"
                            />

                            <div className="flex justify-center mt-2 items-center gap-2">
                                <button
                                    // className={`p-[7px] text-white border bg-green-400`}
                                    className={`p-[7px] text-white border bg-green-400`}
                                    style={{ borderRadius: "5px" }}
                                    onClick={handleEditClick}
                                >
                                    <FaEdit color="white" size={15} />
                                </button>
                                <button
                                    className={`p-[7px] text-white bg-red-500`}
                                    style={{ borderRadius: "5px" }}
                                    onClick={handleClose}
                                >
                                    <Trash size={15} />
                                </button>
                            </div>
                        </label>
                        <input
                            type="file"
                            accept={acceptFileTypes}
                            {...register(name)}
                            onChange={handleChange}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </label>
                    <p>{upoadedFile?.name}</p>
                </>
            ) : (
                <label className="flex items-center justify-center h-32 w-24 border-dashed border-2 border-gray-300 rounded-md cursor-pointer">
                    <input
                        type="file"
                        accept={acceptFileTypes}
                        {...register(name)}
                        onChange={handleChange}
                        className="hidden"
                    />
                    <span className="text-gray-400 px-2 text-center">
                        <Icon size={40} className="ml-4 " />
                        Click to add File
                    </span>
                </label>
            )}
            {!error && <p>{error}</p>}
        </div>
    );
};

export default FileUpload;

