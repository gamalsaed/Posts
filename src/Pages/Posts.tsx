import { SearchProvider } from "@/Context/SearchContext";
import PostsHeader from "@/components/Posts/PostsHeader";
import PostsTable from "@/components/Posts/PostsTable";
export default function Posts() {
  return (
    <div className="w-full mx-auto">
      <SearchProvider>
        <div className="w-full">
          <PostsHeader />
          <PostsTable />
        </div>
      </SearchProvider>
    </div>
  );
}
