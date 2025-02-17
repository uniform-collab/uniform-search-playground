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

`ArticleSearchComponent` is a Uniform Component designed to search and filter articles using Uniform Search functionality. It makes a call to `api/search` route which encapsulates the invocation of Uniform Search API.

### Atom Components

- **SearchInput**: A simple input field allowing users to input search terms. It's designed specifically for use within the `ArticleSearchComponent`.
- **FilterDropdown**: A dropdown component that lets users filter search results based on predefined facets. It works by interacting with Uniform facets to apply specific content filters.
- **ArticleCard**: Renders individual articles, displaying titles and descriptions. It provides a clean visual representation of the search results within the `ArticleSearchComponent`.

### API Endpoint

- **`api/search/route.ts`**: This file configures the preview mode for the application, allowing developers to view and interact with draft content before it is published. It leverages Next.js's API routes to manage and render preview functionality within the app.

### Search Client

- **`/uniform/search/client.ts`**: Contains the `getKnowledgeBaseArticles` function, which is essential for fetching articles from Uniform's backend. It facilitates querying, filtering, and processing articles, making use of Uniform's API for efficient data retrieval.

## Extending the Search Functionality

To create a new `SearchComponent` that supports other entry types beyond Articles, follow these high-level steps:

1. **Define the New Entry Type**: Establish the new entry type within your Uniform project, ensuring that it's properly configured with the necessary fields and metadata.

2. **Clone and Modify ArticleSearchComponent**: Copy the `ArticleSearchComponent` and adapt its logic to interact with the new entry type. Adjust the `getKnowledgeBaseArticles` function or create a similar one to query the new data.

3. **Adjust Atom Components**: Update `SearchInput`, `FilterDropdown`, and `ArticleCard` to accommodate specific fields or behaviors relevant to the new entry type. Ensure that any data-specific logic is adjusted appropriately.

4. **Update API Configuration**: If necessary, extend or modify any existing API routes to cater to the new entry type, focusing on how data is fetched or manipulated.

This approach allows you to maintain scalability and modularity within your Uniform-powered Next.js application, facilitating flexible content management and user interaction.