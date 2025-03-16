import LoadingButton from "@/components/LoadingButton";
import type { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState, type FC } from "react";
import { toast } from "sonner";
import { generateSummary } from "./actions";
interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

const GenerateSummaryButton: FC<GenerateSummaryButtonProps> = ({
  resumeData,
  onSummaryGenerated,
}) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast.error("生成失败");
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      AI 生成
    </LoadingButton>
  );
};

export default GenerateSummaryButton;
