import type React from "react";
import GeneralInfoForm from "../forms/generalInfoForm";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import type { EditorFormProps } from "@/lib/types";
import WorkExperienceForm from "../forms/workExperienceForm";
import EducationForm from "../forms/educationForm";
import SkillsForm from "../forms/SkillsForm";
import SummaryForm from "../forms/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "基本信息", component: GeneralInfoForm, key: "general-info" },
  { title: "个人资料", component: PersonalInfoForm, key: "personal-info" },
  { title: "工作经历", component: WorkExperienceForm, key: "work-experience" },
  { title: "教育经历", component: EducationForm, key: "education-experience" },
  { title: "技能特长", component: SkillsForm, key: "skills" },
  { title: "个人总结", component: SummaryForm, key: "summary" },
];
