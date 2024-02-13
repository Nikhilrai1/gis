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
  username_or_phone: z.string(),
  password: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>

const Login = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username_or_phone: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <AuthLayout title="Login to NepGIS">
      <div className="w-[417px] px-16 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username_or_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Username/Email</FormLabel>
                  <FormControl>
                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Password</FormLabel>
                  <FormControl className="mt-0">
                    <Input   {...field} className='bg-transparent h-fit p-0 rounded-none border-b outline-none border--slate-200' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="border border-slate-200 rounded-full bg-transparent hover:bg-slate-200 hover:text-black p-2 px-6" >
              Login
              <MdArrowOutward />
            </Button>
            <p className="text-tiny mt-3">
              Don't have account?{" "}
              <Link
                to="/signup"
                className=" text-primary-gray-180 hover:text-primary-gray-50 font-semibold duration-100 ease-in-out"
              >
                Register here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default Login
