import { SearchContext } from "@/Context/SearchContext";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
export default function Pagination({ totalPages }: { totalPages: number }) {
  const { author } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage]);

  useEffect(() => {
    setSearchParams({ page: "1" });
    setCurrentPage(1);
  }, [author]);

  const pages = [];
  const maxVisible = 3;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (
      (i === 2 && currentPage > maxVisible) ||
      (i === totalPages - 1 && currentPage < totalPages - maxVisible)
    ) {
      pages.push("...");
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-4 py-3 border-gray-300 border rounded-full disabled:opacity-50"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-4 py-2">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => setCurrentPage(p as number)}
            className={`px-4 py-3 border-gray-300 border rounded-full ${
              currentPage === p ? "bg-blue-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-3 border-gray-300 border rounded-full disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
}
