import type React from "react";
import GeneralInfoForm from "../forms/generalInfoForm";
import PersonalInfoForm from "../forms/PersonalInfoForm";

export const steps: {
  title: string;
  component: React.ComponentType;
  key: string;
}[] = [
  { title: "基本信息", component: GeneralInfoForm, key: "general-info" },
  { title: "个人资料", component: PersonalInfoForm, key: "personal-info" },
];
