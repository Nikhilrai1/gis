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
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom"
import AuthLayout from "@/components/layout/AuthLayout"

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  mobile_number: z.number().min(10,{
    message: "Required 10 digit phone number",
  }).max(10,{
    message: "Required 10 digit phone number",
  }),
  email: z.string(),
  password: z.string(),
  confirm_password: z.string()
})

type FormSchemaType = z.infer<typeof formSchema>

const Signup = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <AuthLayout title="Register to NepGIS">
      <div className="px-16 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">First Name</FormLabel>
                    <FormControl>
                      <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Last Name</FormLabel>
                    <FormControl className="mt-0">
                      <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Mobile Number</FormLabel>
                    <FormControl className="mt-0">
                      <Input type="number"   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Email</FormLabel>
                  <FormControl className="mt-0">
                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input type="password"  {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Confirm Password</FormLabel>
                    <FormControl className="mt-0">
                      <Input type="password"  {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="border border-slate-200 rounded-full bg-transparent hover:bg-slate-200 hover:text-black p-2 px-6" >
              Login
              <MdArrowOutward />
            </Button>
            <p className="text-tiny mt-3">
              Already have account?{" "}
              <Link
                to="/login"
                className=" text-primary-gray-180 hover:text-primary-gray-50 font-semibold duration-100 ease-in-out"
              >
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default Signup
