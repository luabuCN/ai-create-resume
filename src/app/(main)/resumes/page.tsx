import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import ResumeItem from "./ResumeItem";

export const metadata = {
  title: "我的简历",
};

const Page = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  return (
    <main className="font-song max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <Button asChild className="mx-auto flex w-fit gap-2 tracking-wider">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          新建简历
        </Link>
      </Button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">你的简历</h1>
        <p>总数: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
};

export default Page;
