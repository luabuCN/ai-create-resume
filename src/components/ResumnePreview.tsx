import useDimensions from "@/hooks/uesDimesions";
import { cn } from "@/lib/utils";
import type { ResumeValues } from "@/lib/validation";
import { useRef } from "react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "bg-white w-full text-black h-fit aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      ></div>
    </div>
  );
};

export default ResumePreview;
