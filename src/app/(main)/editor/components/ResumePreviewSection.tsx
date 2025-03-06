import type { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import ResumePreview from "@/components/ResumePreview";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
  className?: string;
}
const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
  className,
}) => {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 absolute opacity-50 xl:opacity-100 transition-opacity">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) => {
            setResumeData({ ...resumeData, borderStyle });
          }}
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
