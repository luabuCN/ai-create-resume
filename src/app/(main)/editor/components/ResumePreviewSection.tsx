import type { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import ResumePreview from "@/components/ResumePreview";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}
const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
}) => {
  return (
    <div className="md:flex w-1/2 hidden relative">
      <div className="left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 absolute">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
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
