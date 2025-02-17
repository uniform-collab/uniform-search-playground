import { getKnowledgeBaseArticles } from "@/uniform/search/client";
import { RichTextNode } from "@uniformdev/richtext";

//Define the structure of a knowledge base article
interface KnowledgeBaseArticle {
  id: string;
  title: string;
  description: RichTextDescription;
  // Add other necessary fields if needed
}
interface RichTextDescription {
  type: string;
  value: {
    root: any; // Use the proper type if available
  };
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
  type RichTextDescription,
};
