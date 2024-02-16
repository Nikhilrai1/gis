"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { usePostGisFileMutation } from '@/redux/features/gis-data/gisApi'
import { showToast } from '@/lib/Toast'
import FileUpload from '../ui/FileUploadInput'
import { ErrorPayload } from '@/typing'


// validation
const formSchema = z.object({
    name: z.string().min(3),
    date: z.string()
})

type FormSchema = z.infer<typeof formSchema>

interface GisFileUploadProps {
    setModalOpen: (isModalOpen: boolean) => void;
}

// form
const GisFileUpload = ({ setModalOpen }: GisFileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadGisFile, { isLoading }] = usePostGisFileMutation();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name }: FormSchema) {
        if (name && file) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            uploadGisFile(formData).unwrap().then(() => {
                showToast("Gis File Uploaded Successfully.", { type: "success" });
                setModalOpen(false);
            }).catch((err: ErrorPayload) => {
                err?.data?.errors.map(el => {
                    showToast(el.message, {
                        type: "error",
                    })
                })
            });
        } else {
            showToast("File is missing", {
                type: "warning",
            });
        }
    };


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="File Name"  {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="File Name" type='text'  {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FileUpload
                        name="file"
                        //@ts-ignore
                        register={form?.register}
                        label="File"
                        value={file}
                        onChange={(uploadedFile) => setFile(uploadedFile)}
                    />

                    <div className='flex items-center gap-3 justify-end'>
                        <Button
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Upload"}
                        </Button>
                        <Button onClick={() => { }} className='bg-red-500'>Cancel</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default GisFileUpload