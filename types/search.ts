import { getKnowledgeBaseArticles } from "@/uniform/search/client";
import { RichTextNode } from "@uniformdev/richtext";

//Define the structure of a knowledge base article
interface KnowledgeBaseArticle {
  id: string;
  title: string;
  description: RichTextNode;
  // Add other necessary fields if needed
}

// Define the structure of the response from the API
interface ArticlesWithPagination {
  items: KnowledgeBaseArticle[];
  page: number;
  perPage: number;
  totalCount: number;
  facets: Facets;
}

// Define a type for one facet's data
interface FacetValueCounts {
  [facetValue: string]: number;
}

// Define the Facets type for the entire response
interface Facets {
  [facetField: string]: FacetValueCounts;
}

export {
  type KnowledgeBaseArticle,
  type ArticlesWithPagination,
  type Facets,
  type FacetValueCounts,
};
