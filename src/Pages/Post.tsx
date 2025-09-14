import { useContext } from "react";
import { UsersContext } from "@/Context/UsersContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { fetchPost } from "@/lib/api";
import { ArrowLeft, User, Calendar } from "lucide-react";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import type { User as UserInterface } from "@/lib/interfaces";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { users } = useContext(UsersContext);
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["post", id],
    enabled: !!id,
    queryFn: () => fetchPost(id),
  });

  let userName: UserInterface | undefined;

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error text="Something went wrong while fetching the post" />;
  }
  if (isSuccess) {
    let findUser = users.find((user) => user.id === data.userId);
    userName = findUser;
  }
  const Dateformatted = format(Date.now(), "EEE, MMMM do, yyyy");
  return (
    <div className="w-full mx-auto mt-5 h-[729px]">
      <div className="flex flex-col justify-end bg-gradient-to-b from-[#21609A]/90 to-[#00254A]/60 backdrop-blur-sm px-6 py-3 rounded-t-lg h-[40%] ">
        <button className="flex items-center text-sm text-[#1A1A1A] bg-[#FFFFFFBF] cursor-pointer mb-4 w-fit py-2 px-3 rounded-2xl">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <Link to="/">Back to Posts</Link>
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">{data.title}</h1>

        <div className="flex items-center gap-6 text-sm text-white/80 mb-4">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {userName?.name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {Dateformatted}
          </span>
        </div>
      </div>
      <div className="bg-white/30 backdrop-blur-sm px-6 py-3 rounded-b-lg text-gray-900 whitespace-pre-line h-[40%]">
        {data.body}
      </div>
    </div>
  );
}
