"use server";

import openai from "@/lib/openai";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceSchema,
  type GenerateWorkExperienceInput,
  type WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateSummary(input: GenerateSummaryInput) {
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `你是一个工作简历生成器AI。你的任务是根据用户提供的数据为简历写一篇专业的介绍摘要。
只返回摘要，在响应中不包含任何其他信息。保持简洁和专业，中文回复`;

  const userMessage = `请根据以下数据生成一份专业的简历摘要：

    职位名称: ${jobTitle || "暂无"}

    工作经历:
    ${workExperiences
      ?.map(
        (exp) => `
        职位: ${exp.position || "暂无"} 
        公司: ${exp.company || "暂无"}
        时间: ${exp.startDate || "暂无"} 至 ${exp.endDate || "至今"}

        工作描述:
        ${exp.description || "暂无"}
        `
      )
      .join("\n\n")}

    教育经历:
    ${educations
      ?.map(
        (edu) => `
        学历: ${edu.degree || "暂无"}
        学校: ${edu.school || "暂无"}
        时间: ${edu.startDate || "暂无"} 至 ${edu.endDate || "暂无"}
        专业: ${edu.major || "暂无"}
        `
      )
      .join("\n\n")}

    技能特长:
    ${skills || "暂无"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message?.content;

  if (!aiResponse) {
    throw new Error("AI响应为空");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  你是一个工作简历生成器AI。你的任务是根据用户输入生成一条工作经历。
  你的回复必须遵循以下结构。如果无法从提供的数据中推断出某些字段，可以省略，但不要添加新的字段。

  职位: <职位名称>
  公司: <公司名称>
  开始日期: <格式: YYYY-MM-DD> (仅在提供时填写)
  结束日期: <格式: YYYY-MM-DD> (仅在提供时填写)
  描述: <优化后的描述，采用要点格式，可能根据职位推断>
  `;

  const userMessage = `
  请根据以下描述提供一条工作经历：
  ${description}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("AI响应为空");
  }

  return {
    position: aiResponse.match(/职位: (.*)/)?.[1] || "",
    company: aiResponse.match(/公司: (.*)/)?.[1] || "",
    description: (aiResponse.match(/描述:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/开始日期: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/结束日期: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
