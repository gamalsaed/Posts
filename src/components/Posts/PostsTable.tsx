import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "@/Context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface post {
  id: number;
  userId: number;
  body: string;
  title: string;
}

export default function PostsTable() {
  const [searchParams] = useSearchParams();
  const { author, search } = useContext(SearchContext);
  const pageParam = searchParams.get("page");
  const page: number = pageParam ? parseInt(pageParam, 10) : 1;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (error) {
    return <Error text="Something Went Worng While Fetching Posts" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (posts) {
    let filterationPosts = [...posts];
    if (author) {
      filterationPosts = filterationPosts.filter(
        (post) => post.userId === author
      );
    }

    if (search) {
      filterationPosts = filterationPosts.filter((post) =>
        JSON.stringify(post).toLowerCase().includes(search.toLowerCase())
      );
    }

    const postsPerPage = 10;
    const totalPages = filterationPosts.length / postsPerPage;
    const end = page * postsPerPage;
    const start = end - postsPerPage;
    const pagePosts = filterationPosts.slice(start, end);
    return (
      <Table className="mb-5 ">
        <TableCaption className="bg-white p-5 rounded-b-2xl m-0">
          <div className="flex justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </TableCaption>

        <TableBody className="bg-[#ffffffb6] bac backdrop-blur-sm">
          {pagePosts.map((post: post) => (
            <TableRow
              key={post.title}
              className="border-gray-300 hover:bg-white cursor-pointer !w-full"
            >
              <Link to={`post/${post.id}`} className="w-full">
                <TableCell className="font-medium text-[16px] p-3 !w-full">
                  {post.title}
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
