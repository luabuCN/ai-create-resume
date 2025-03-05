import useDimensions from "@/hooks/uesDimesions";
import { cn } from "@/lib/utils";
import type { ResumeValues } from "@/lib/validation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
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
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
};

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

const PersonalInfoHeader: React.FC<ResumeSectionProps> = ({ resumeData }) => {
  const { photo, name, jobTitle, city, country, phone, email } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">{name}</p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {country}
          {city && country ? ", " : ""}
          {city}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
};

const SummarySection: React.FC<ResumeSectionProps> = ({ resumeData }) => {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold ">个人简介</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
};

const WorkExperienceSection: React.FC<ResumeSectionProps> = ({
  resumeData,
}) => {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">工作经历</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between  font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "yyyy/MM")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "yyyy/MM") : "至今"}
                </span>
              )}
            </div>
            <p className=" font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-sm">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

const EducationSection: React.FC<ResumeSectionProps> = ({ resumeData }) => {
  const { educations } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">教育经历</p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span>
                {edu.degree}·{edu.major}
              </span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "yyyy/MM")} ${edu.endDate ? `- ${formatDate(edu.endDate, "yyyy/MM")}` : ""}`}
                </span>
              )}
            </div>
            <p className=" font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const SkillsSection: React.FC<ResumeSectionProps> = ({ resumeData }) => {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">技能特长</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black text-[16px]"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
