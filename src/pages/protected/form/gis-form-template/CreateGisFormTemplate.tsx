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


// validation
const formSchema = z.object({
  name: z.string().min(3),
})

type FormSchema = z.infer<typeof formSchema>


const CreateGisFormTemplate = () => {
  const [formFields, setFormFields] = useState<DynamicFormFieldI[]>([
    {
      form_type: "StringField",
      name: "name",
      required: false,
      select_field: null
    },
    {
      form_type: "DropDown",
      name: "country",
      required: false,
      select_field: null
    },
    {
      form_type: "StringField",
      name: "name",
      required: false,
      select_field: null
    },
    {
      form_type: "DropDown",
      name: "country",
      required: false,
      select_field: null
    },

  ]);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name }: FormSchema) {

  };

  const isLoading = false;

  return (
    <PageLayout title="Create Gis Form Template">
      <div className="bg-white p-5 rounded-lg shadow-lg">

        <Form {...form}>
          <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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