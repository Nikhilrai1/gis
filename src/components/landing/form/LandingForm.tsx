import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MdArrowOutward } from "react-icons/md";



const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 3 characters.",
    }),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
})



type FormSchemaType = z.infer<typeof formSchema>

const LandingForm = () => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
    })


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div
            id="getInTouchForm"
            className="w-[517px] h-[664px] bg-primary-blue-200 text-white py-8 px-16"
        >
            <p className="text-center text-[32px] leading-3xl mb-16">Get In Touch</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Your Name</FormLabel>
                                <FormControl>
                                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Your Email</FormLabel>
                                <FormControl className="mt-0">
                                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Subject</FormLabel>
                                <FormControl>
                                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Your Message (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea {...field} id="message" className="bg-transparent h-10 p-0 rounded-none border-b outline-none border--slate-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="border border-slate-200 rounded-full bg-transparent hover:bg-slate-200 hover:text-black p-2 px-6" >
                        Send Message
                        <MdArrowOutward />
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LandingForm;
