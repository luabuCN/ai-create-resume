import useDebounce from "@/hooks/useDebounce";
import type { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveResume } from "./actions";
import { fileReplacer } from "@/lib/utils";
export const useAutoSaveResume = (resumeData: ResumeValues) => {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSaveData, setLastSaveData] = useState(structuredClone(resumeData));

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(debouncedResumeData);
        const updateResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSaveData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: null,
          }),
          id: resumeId,
        });
        setResumeId(updateResume.id);
        setLastSaveData(newData);

        if (searchParams.get("resumeId") !== updateResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updateResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
        toast("出现错误", {
          description: "无法保存简历",
          action: {
            label: "重试",
            onClick: () => save(),
          },
        });
      } finally {
        setIsSaving(false);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSaveData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    lastSaveData,
    isSaving,
    isError,
    searchParams,
    resumeId,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaveData),
  };
};
