"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import SearchInput from "../Search/SearchInput/index";
import FilterDropdown from "../FilterDropdown";
import { ComponentProps } from "@uniformdev/canvas-next-rsc/component";
import { Slots, Parameters } from "./props";
import {
  ArticlesWithPagination,
  Facets,
  KnowledgeBaseArticle,
} from "@/types/search";

const ArticleCard = lazy(() => import("../Search/ArticleCard"));

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Handle empty or undefined filterOptions
        const optionsArray = filterOptions
          .split(",")
          .map((option) => option.trim());

        const facetByParams =
          optionsArray.length > 0
            ? `${optionsArray.map((option) => `fields.${option}`).join(",")}`
            : "";

        const response = await fetch(
          `/api/search?search=${encodeURIComponent(
            searchTerm
          )}&filters=${encodeURIComponent(
            JSON.stringify(filters)
          )}&facetBy=${facetByParams}`
        );

        const data: ArticlesWithPagination = await response.json();
        setArticles(data.items);

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

  const handleFilterChange = (filter: Record<string, string>) => {
    const [facetName, value] = Object.entries(filter)[0];

    if (!value) {
      setFilters((prev) => {
        const { [facetName]: _, ...rest } = prev;
        return rest;
      });
    } else {
      const newFilter = { [facetName]: { eq: value } };
      setFilters((prev) => ({
        ...prev,
        ...newFilter,
      }));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 100%", minWidth: "150px" }}>
          <SearchInput onSearch={setSearchTerm} />
        </div>
        {(initialFacets || facets) &&
          Object.entries(initialFacets).map(([facetName, facetValues]) => (
            <div key={facetName} style={{ flex: "1 1 10%", minWidth: "150px" }}>
              <FilterDropdown
                key={facetName}
                facet={{
                  name: facetName,
                  buckets: Object.entries(facetValues || {}).map(
                    ([value, count]) => ({
                      value,
                      count,
                    })
                  ),
                }}
                onFilterChange={handleFilterChange}
              />
            </div>
          ))}
      </div>

      <Suspense fallback={<p>Loading articles...</p>}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {articles === null ? (
            <p>Loading articles...</p>
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                style={{ border: "1px solid #ccc", padding: "16px" }}
              >
                <ArticleCard
                  title={article.title}
                  description={article.description}
                />
              </div>
            ))
          ) : (
            <p>No articles found. Try adjusting your search or filters.</p>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default ArticleSearchComponent;
