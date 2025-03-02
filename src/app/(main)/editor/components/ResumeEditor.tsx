"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "../config/steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./footer";

const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const setCurrentStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-3 text-center">
        <h1 className="text-2xl font-bold font-mono">设计你的简历</h1>
        <p className="text-sm text-muted-foreground">
          按照以下步骤创建你的简历。你的进度将会自动保存。
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2 p-3 overflow-y-auto space-y-6">
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && <FormComponent />}
          </div>
          <div className="grow md:border-r" />
          <div className="md:flex w-1/2 hidden p-3">right</div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default ResumeEditor;
