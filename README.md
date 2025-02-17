# Hello World starter for Next.js app router

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Pre-requisites

1. Uniform account with an empty project.

## Getting Started

1. Install dependencies with `npm install`
1. Change the API key and Project ID env vars in `.env` with your own.
    > Make sure your API key has "Developer" role to be able to push content.
2. `npm run uniform:push` to push content from disk (`/uniform-data` folder) to your project. 
3. Run the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

### ArticleSearchComponent

`ArticleSearchComponent` is a Uniform Component designed to search and filter articles effectively. It integrates with Uniform's data model, allowing seamless interaction with content types defined within your Uniform project.

### Atom Components

- **[SearchInput](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/components/Search/SearchInput/index.tsx)**: A simple input field allowing users to input search terms, designed specifically for use within the `ArticleSearchComponent`.
- **[FilterPanel](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/components/Search/FilterPanel/index.tsx)**: A filter panel component that lets users filter search results based on predefined facets, interacting with Uniform facets to apply specific content filters.
- **[ArticleCard](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/components/Search/ArticleCard/index.tsx)**: Renders individual articles, displaying titles and descriptions to provide a clean visual representation of the search results within the `ArticleSearchComponent`.

### API Endpoint

- **[`/api/search/route.ts`](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/api/search/route.ts)**: Handles search functionality by querying the API to retrieve articles based on search terms and filters. It constructs queries and handles the integration with Uniform's backend services.

### Search Client

- **[`/uniform/search/client.ts`](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/uniform/search/client.ts)**: Contains the `getKnowledgeBaseArticles` function, essential for fetching articles from Uniform's backend. It facilitates querying, filtering, and processing articles, using Uniform's API for efficient data retrieval. For more details on working with the search API, developers can refer to [Uniform's documentation on search and filtering](https://docs.uniform.app/docs/knowledge-base/search-and-filtering).

### Uniform Configuration

- **[Search Composition](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/uniform-data/composition/f6d9bd25-296d-4c1c-9a8a-139911cbd165.yaml)**: Configures the search composition where `ArticleSearchComponent` is used, specifying the setup within Uniform's ecosystem.
  
- **[Component Definition](https://github.com/ArtemNizelnyk/uniform-search-playground/blob/main/nextjs-app-router/uniform-data/component/articleSearchComponent.yaml)**: Defines the `ArticleSearchComponent` in Uniform, specifically its `filterOptions` parameter, which controls the facets used in the search functionality. 
Syntax for fields: `fieldName` 
Syntax for reference fields: `refFieldName.fieldName` 
Syntax for `ArticleSearchComponent`'s `filterOptions` parameter: `label:fieldName`
where `label` is the label of the facet in the UI and fieldName is the field on the Article content type that will be used to filter the results.
By default uses: `Category:category.name,Tags:tags.name` to facetBy `Category` and `Tags` of the Article content type

## Extending the Search Functionality

To create a new `SearchComponent` that supports other entry types beyond Articles, follow these high-level steps:

1. **Define the New Entry Type**: Establish the new entry type within your Uniform project, ensuring it's configured with necessary fields and metadata.

2. **Clone and Modify ArticleSearchComponent**: Copy the `ArticleSearchComponent` and adapt its logic to interact with the new entry type. Adjust the `getKnowledgeBaseArticles` function or create a similar one to query the new data.

3. **Adjust Atom Components**: Update `SearchInput`, `FilterPanel`, and `ArticleCard` to accommodate specific fields or behaviors relevant to the new entry type. Ensure that any data-specific logic is adjusted appropriately.

4. **Update API Configuration**: If necessary, extend or modify existing API routes to cater to the new entry type, focusing on how data is fetched or manipulated.

5. **Test and Deploy**: Thoroughly test the new component with varying entry types to ensure compatibility and performance, then integrate it into your Uniform project.

This approach maintains scalability and modularity within your Uniform-powered Next.js application, facilitating flexible content management and user interaction.
