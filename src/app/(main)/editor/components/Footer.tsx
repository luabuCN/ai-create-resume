import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, type FC } from "react";
import { steps } from "../config/steps";
import { PenLineIcon, FileUserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

const Footer: FC<FooterProps> = ({
  currentStep,
  setCurrentStep,
  setShowSmResumePreview,
  showSmResumePreview,
  isSaving,
}) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  useEffect(() => {
    console.log(
      showSmResumePreview,
      "setShowSmResumePreview(!showSmResumePreview)"
    );
  }, [showSmResumePreview]);
  return (
    <footer className="w-full border-t px-3 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3 font-mono ">
          <Button
            variant="secondary"
            className="tracking-[0.3em] font-semibold"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            上一步
          </Button>
          <Button
            className="tracking-[0.3em] font-semibold"
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            下一步
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={showSmResumePreview ? "编辑简历" : "预览简历"}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            asChild
            className="tracking-[0.3em] font-semibold"
          >
            <Link href="/resumes">关闭</Link>
          </Button>
          <p
            className={cn(
              " text-muted-foreground opacity-0",
              isSaving && "opacity-100"
            )}
          >
            保存中...
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
