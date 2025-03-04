import ResumePreview from "@/components/ResumnePreview";
import type { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}
const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
  resumeData,
  setResumeData,
}) => {
  return (
    <div className="md:flex w-1/2 hidden">
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
