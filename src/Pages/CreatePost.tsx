import CreatePostHeader from "@/components/createPost/createPostHeader";
import CreatePostForm from "@/components/createPost/CreatePostForm";
export default function CreatePost() {
  return (
    <div>
      <CreatePostHeader />
      <div className="bg-[#FFFFFFBF] p-5  h-[78vh] rounded-b-2xl">
        <CreatePostForm />
      </div>
    </div>
  );
}
