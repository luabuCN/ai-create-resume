"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!resume) {
    throw new Error("Resume not found");
  }
  await prisma.resume.delete({
    where: {
      id,
    },
  });
  revalidatePath("/resumes");
}
