import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPost } from "@/lib/api";
import { ArrowLeft, User, Calendar } from "lucide-react";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
const post = {
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  author: "Leanne Graham",
  date: "Sun, August 24th, 2019",
  body: `quia et suscipit
    suscipit recusandae consequuntur expedita et cum
    reprehenderit molestiae ut ut quas totam
    nostrum rerum est autem sunt rem eveniet architecto`,
};

export default function Post() {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error text="Something went wrong while fetching the post" />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 h-[729px]">
      <div className="flex flex-col justify-end bg-gradient-to-b from-[#21609A]/90 to-[#00254A]/60 backdrop-blur-sm px-6 py-3 rounded-t-lg h-[40%] ">
        <button className="flex items-center text-sm text-[#1A1A1A] bg-[#FFFFFFBF] cursor-pointer mb-4 w-fit py-2 px-3 rounded-2xl">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <Link to="/">Back to Posts</Link>
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">{data.title}</h1>

        <div className="flex items-center gap-6 text-sm text-white/80 mb-4">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
        </div>
      </div>
      <div className="bg-white/30 backdrop-blur-sm px-6 py-3 rounded-b-lg text-gray-900 whitespace-pre-line h-[40%]">
        {data.body}
      </div>
    </div>
  );
}
