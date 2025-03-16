import { Metadata } from "next";
import ResumeEditor from "./components/ResumeEditor";
import { Suspense, type FC } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "编辑简历",
  description: "使用 AI 助手创建你的简历",
};

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

const EditorPage: FC<PageProps> = async ({ searchParams }) => {
  const { resumeId } = await searchParams;
  const { userId } = await auth();
  if (!userId) return null;
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: resumeDataInclude,
      })
    : null;
  return (
    <Suspense>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </Suspense>
  );
};

export default EditorPage;
