import { AlertCircle } from "lucide-react";

export default function Error({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center border border-red-400 bg-red-50 text-red-600 rounded-md p-3 w-full max-w-lg mx-auto mt-5">
      <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
      <span className="font-medium">{text}</span>
    </div>
  );
}
