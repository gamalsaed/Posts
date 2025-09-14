import { NotebookPen } from "lucide-react";
export default function CreatePostHeader() {
  return (
    <header className="bg-white rounded-t-2xl p-3 mt-5 font-semibold  flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5">
      <div className="flex items-center gap-2">
        <span>
          <NotebookPen width={20} height={20} />
        </span>
        <span className="text-[20px]">Create a New Post</span>
      </div>
    </header>
  );
}
