import { Button } from "@/components/ui/button";
import {
  educationSchema,
  type EducationValues,
  type ResumeValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EducationFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  return (
    <div className="max-w-xl mx-auto space-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">工作经历</h2>
        <p className="text-sm text-muted-foreground">添加个人以往的工作经历</p>
      </div>
      <Form {...form}>
        <form className="space-y-3 mt-[1.5rem]">
          {fields.map((field, index) => (
            <EducationItem
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  major: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              添加工作经历
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({
  form,
  index,
  remove,
}) => {
  return (
    <div className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">教育经历 {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground focus:outline-none" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>学历/学位</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>学校名称</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.major`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>主修专业</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>开始日期</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>结束日期</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        删除
      </Button>
    </div>
  );
};

export default EducationForm;
