"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import SearchInput from "../Search/SearchInput/index";
import { ComponentProps } from "@uniformdev/canvas-next-rsc/component";
import { Slots, Parameters } from "./props";
import {
  ArticlesWithPagination,
  Facets,
  KnowledgeBaseArticle,
} from "@/types/search";
import { Facet } from "../Search/FilterPanel";

const ArticleCard = lazy(() => import("../Search/ArticleCard"));
const FilterPanel = lazy(() => import("../Search/FilterPanel"));

export const ArticleSearchComponent = ({
  component,
  context,
  slots,
  filterOptions = "",
}: ComponentProps<Parameters, Slots>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [articles, setArticles] = useState<KnowledgeBaseArticle[] | null>(null);
  const [facets, setFacets] = useState<Facets>({});
  const [initialFacets, setInitialFacets] = useState<Facets>({});
  const [filterDefs, setFilterDefs] = useState<{ filterName: string; filterField: string }[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log(filterOptions)
        const optionsArray = filterOptions
          .split(",")
          .map((pair) => pair.trim())
          .filter(Boolean);

        console.log(optionsArray)
        // For each comma-separated pair, we get:
        //  e.g. "Category:category.name" -> { filterName: "Category", filterField: "fields.category.name" }
        const pairs = optionsArray.map((item) => {
          const [filterName, filterField] = item.split(":").map((s) => s.trim());
          return { filterName, filterField: "fields." + filterField };
        });

        //save pairs for FilterPanel
        setFilterDefs(pairs);
        // Build the facetBy string
        // e.g. "fields.category.name,fields.tags.name"
        const facetByParams = pairs
          .map((p) => `${p.filterField}`)
          .join(",");

        const response = await fetch(
          `/api/search?search=${encodeURIComponent(
            searchTerm
          )}&filters=${encodeURIComponent(
            JSON.stringify(filters)
          )}&facetBy=${facetByParams}`
        );
        const data: ArticlesWithPagination = await response.json();
        setArticles(data.items);

        // Store initial facets only once
        if (!Object.keys(initialFacets).length) {
          setInitialFacets(data.facets);
        }
        setFacets(data.facets);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      }
    };
    fetchArticles();
  }, [searchTerm, filters, filterOptions]);

  const handleFilterPanelChange = (filter: Record<string, string | null>) => {
    // If the user unchecks a box, remove that filter from state
    // If the user checks a box, set that filter
    const [facetName, value] = Object.entries(filter)[0];
    setFilters((prev) => {
      if (!value) {
        const temp = { ...prev };
        delete temp[facetName];
        return temp;
      }
      return { ...prev, [facetName]: { eq: value } };
    });
  };

  // Turn the initialFacets object into an array of { name, buckets } for FilterPanel
  const facetArray: Facet[] = Object.entries(initialFacets).map(
    ([facetName, facetValues]) => ({
      name: facetName,
      buckets: Object.entries(facetValues || {}).map(([val, count]) => ({
        value: val,
        count,
      })),
    })
  );

  // Example: gather currently applied filters for displaying badges
  const activeFilters = Object.entries(filters).map(([facetName, filterObj]) =>
    filterObj.eq ? filterObj.eq : ""
  );

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left column: Filters */}
      <aside className="w-64 bg-white border-r p-4 hidden sm:block">
        <FilterPanel facets={facetArray} filterDefs={filterDefs} onChange={handleFilterPanelChange} />
      </aside>

      {/* Right column: Search Input, filter badges, results */}
      <main className="flex-1 p-6">
        {/* Search bar */}
        <SearchInput onSearch={setSearchTerm} />

        {/* Active filter badges + “Clear all” */}
        {activeFilters.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 my-4">
            {activeFilters.map((val) => (
              <div
                key={val}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
              >
                {val} ✕
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-blue-600 text-sm ml-auto"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        <Suspense fallback={<p>Loading articles...</p>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {articles === null ? (
              <p>Loading articles...</p>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCardWrapper key={article.id} article={article} />
              ))
            ) : (
              <p>No articles found. Try adjusting your search or filters.</p>
            )}
          </div>
        </Suspense>
      </main>
    </div>
  );
};

// Helper for lazy-loaded ArticleCard
function ArticleCardWrapper({ article }: { article: KnowledgeBaseArticle }) {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <Suspense fallback={<p>Loading card...</p>}>
        <ArticleCard
          title={article.title}
          description={article.description}
        />
      </Suspense>
    </div>
  );
}

export default ArticleSearchComponent;