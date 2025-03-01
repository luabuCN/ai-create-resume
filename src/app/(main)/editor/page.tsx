import type { Metadata } from "next";
import ResumeEditor from "./components/ResumeEditor";

export const matedata: Metadata = {
  title: "设计你的简历",
};

const Page = () => {
  return <ResumeEditor />;
};

export default Page;
