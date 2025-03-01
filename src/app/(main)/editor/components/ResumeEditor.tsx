"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralInfoForm from "../forms/generalInfoForm";

const ResumeEditor = () => {
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
          <div className="w-full md:w-1/2 p-3">
            <GeneralInfoForm />
          </div>
          <div className="grow md:border-r" />
          <div className="md:flex w-1/2 hidden p-3">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3 font-mono ">
            <Button
              variant="secondary"
              className="tracking-[0.3em] font-semibold"
            >
              上一步
            </Button>
            <Button className="tracking-[0.3em] font-semibold">下一步</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              asChild
              className="tracking-[0.3em] font-semibold"
            >
              <Link href="/resumes">关闭</Link>
            </Button>
            <p className=" text-muted-foreground opacity-0">保存中...</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeEditor;
