import { SearchProvider } from "@/Context/SearchContext";
import PostsHeader from "@/components/Posts/PostsHeader";
import PostsTable from "@/components/Posts/PostsTable";
export default function Posts() {
  return (
    <div className="max-w-4xl mx-auto">
      <SearchProvider>
        <PostsHeader />
        <PostsTable />
      </SearchProvider>
    </div>
  );
}
