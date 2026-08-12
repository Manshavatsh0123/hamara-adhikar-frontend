"use client";

import { Mic, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    const query = search.trim();

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <section className="w-full bg-white py-7 sm:py-8">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-0">

        <div
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-gray-200
            bg-white
            p-2
            shadow-[0_2px_10px_rgba(0,0,0,0.06)]
          "
        >

          {/* =========================================
              INPUT AREA
          ========================================== */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">

            <Search
              size={21}
              strokeWidth={2}
              className="shrink-0 text-[#006b3f]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for a scheme, keyword or department..."
              className="
                min-w-0
                flex-1
                bg-transparent
                py-3
                text-sm
                text-gray-800
                outline-none
                placeholder:text-gray-400
              "
            />

            {/* Mic */}
            <button
              type="button"
              aria-label="Voice search"
              className="
                hidden
                shrink-0
                rounded-full
                bg-[#f0f7f1]
                p-2
                text-[#006b3f]
                transition
                hover:bg-[#e4f1e6]
                sm:flex
              "
            >
              <Mic size={18} />
            </button>

          </div>


          {/* =========================================
              SEARCH BUTTON
          ========================================== */}
          <button
            type="button"
            onClick={handleSearch}
            className="
              shrink-0
              rounded-lg
              bg-[#006b3f]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#005331]
              active:scale-[0.98]
            "
          >
            Search
          </button>

        </div>

      </div>
    </section>
  );
}