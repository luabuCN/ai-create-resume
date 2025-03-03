import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EditorFormProps } from "@/lib/types";
import {
  workExperienceSchema,
  type WorkExperienceValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect, type FC } from "react";
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";

const WorkExperienceForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
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
            <WorkExperienceItem
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
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
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

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem: FC<WorkExperienceItemProps> = ({
  form,
  index,
  remove,
}) => {
  return (
    <div className="space-y-3 rounded-md border bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">工作经历 {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground focus:outline-none" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>职位名称</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>公司名称</FormLabel>
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
          name={`workExperiences.${index}.startDate`}
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
          name={`workExperiences.${index}.endDate`}
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
      <FormDescription>
        如果你目前在职，请将<span className="font-semibold">结束日期</span>
        留空。
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>工作描述</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        删除
      </Button>
    </div>
  );
};
export default WorkExperienceForm;
