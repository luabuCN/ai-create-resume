import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const presonalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !File || (file instanceof File && file.type.startsWith("image/")),
      "必须添加图片"
    )
    .refine(
      (file) => !file || (file instanceof File && file.size <= 1024 * 1024 * 4),
      "图片大小不能超过 4MB"
    ),
  name: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof presonalInfoSchema>;
