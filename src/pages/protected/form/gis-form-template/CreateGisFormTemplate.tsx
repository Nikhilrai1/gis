import PageLayout from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DynamicFormFieldI } from "@/redux/features/gis-form-template/gis-form-template"
import { useState } from "react"
import FormFieldCreator from "@/components/form-template/form-template-creator/FormTemplateCreator"
import { usePostDynamicFormMutation } from "@/redux/features/gis-form-template/gisFormTemplateApi"
import { useAppSelector } from "@/redux/store"
import { ErrorPayload } from "@/typing"
import { showToast } from "@/lib/Toast"
import { useNavigate } from "react-router-dom"

// validation
const formSchema = z.object({
  name: z.string().min(3),
})

type FormSchema = z.infer<typeof formSchema>


const CreateGisFormTemplate = () => {
  // STATE
  const [formFields, setFormFields] = useState<DynamicFormFieldI[]>([]);
  const { gisData } = useAppSelector(state => state.gis);
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // API
  const [createFormTemplate, { isLoading }] = usePostDynamicFormMutation();



  // 2. Define a submit handler.
  async function onSubmit({ name }: FormSchema) {
    createFormTemplate({
      name,
      gis_file: gisData?.id as string || "",
      form_fields: formFields,
    }).unwrap().then(() => {
      showToast("Form Template Created Successfully.", {
        type: "success",
      })
      navigate("/form-templates")

    }).catch((err: ErrorPayload) => {
      err?.data?.errors.map(el => {
        showToast(el.message, {
          type: "error",
        })
      })
    })

  };

  return (
    <PageLayout className="page-style" title="Create Gis Form Template">
      <div className="bg-white p-5 rounded-lg shadow-2xl border">

        <Form {...form}>
          <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 pr-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Template Form Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Form Name"  {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormLabel className="text-lg">Add Form Fields</FormLabel>
              <FormFieldCreator formFields={formFields} setFormFields={setFormFields} />
            </div>

            <div className='flex items-center'>
              <Button
                disabled={isLoading}
                className="bg-primary-blue-900"
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </Form>
      </div>

    </PageLayout>
  )
}

export default CreateGisFormTemplate