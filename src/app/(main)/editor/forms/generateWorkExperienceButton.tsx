import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  generateWorkExperienceSchema,
  type GenerateWorkExperienceInput,
  WorkExperience,
} from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
interface IGenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (WorkExperience: WorkExperience) => void;
}

const GenerateWorkExperienceButton: FC<IGenerateWorkExperienceButtonProps> = ({
  onWorkExperienceGenerated,
}) => {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4" />
        AI 生成
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
};

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.error(error);
      toast.error("出错了，请重试。");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>生成工作经历</DialogTitle>
          <DialogDescription>
            描述你的工作经历，AI 将为你生成优化后的内容。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`例如："从2019年11月到2020年12月，我担任软件工程师，我的工作内容包括：..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              生成
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateWorkExperienceButton;
