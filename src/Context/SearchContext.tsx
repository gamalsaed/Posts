import { createContext, useState, type ReactNode } from "react";

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
  author: "",
  setAuthor: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  console.log(author);
  return (
    <SearchContext.Provider value={{ search, setSearch, author, setAuthor }}>
      {children}
    </SearchContext.Provider>
  );
}
