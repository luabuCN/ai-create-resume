import { Metadata } from "next";
import ResumeEditor from "./components/ResumeEditor";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "编辑简历",
  description: "使用 AI 助手创建你的简历",
};

const EditorPage = () => {
  return (
    <Suspense>
      <ResumeEditor />
    </Suspense>
  );
};

export default EditorPage;
