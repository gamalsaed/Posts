import { useContext } from "react";
import { Link } from "react-router-dom";
import { ScrollText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchContext } from "@/Context/SearchContext";
import { UsersContext } from "@/Context/UsersContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostsHeader() {
  const { search, setSearch, setAuthor } = useContext(SearchContext);
  const { users } = useContext(UsersContext);
  return (
    <>
      <header className="bg-white rounded-t-2xl p-3 mt-5 font-semibold  flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5">
        <div className="flex items-center gap-2">
          <span>
            <ScrollText width={28} height={28} />
          </span>
          <span className="text-[20px]">Post List</span>
        </div>
        <Link
          to="/create-post"
          className="text-[#000000] opacity-40 flex items-center text-[16px]"
        >
          <span>
            <Plus width={18} height={18} />
          </span>
          <span>Create a new post</span>
        </Link>
      </header>
      <div className="bg-[#ACB7C0] p-5">
        <div className="flex gap-5 max-sm:flex-col">
          <div className="relative flex-1">
            <Search
              width={18}
              height={18}
              className=" absolute top-2.5 left-2.5"
            />
            <Input
              className="bg-white border-0 pl-9 rounded-2xl h-[40px] "
              placeholder="Search for a post..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap max-sm:justify-center">
            <div>Author:</div>
            <Select onValueChange={(e) => setAuthor(e)}>
              <SelectTrigger className="w-[130px] bg-white border-0 ">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectGroup>
                  <SelectItem value={false} className="opacity-60">
                    All
                  </SelectItem>
                  {users?.map((user) => {
                    return (
                      <SelectItem key={user.name} value={user.id}>
                        {user.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
