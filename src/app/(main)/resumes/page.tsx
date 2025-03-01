import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="font-song max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <Button asChild className="mx-auto flex w-fit gap-2 tracking-wider">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          新建简历
        </Link>
      </Button>
    </main>
  );
};

export default Page;
