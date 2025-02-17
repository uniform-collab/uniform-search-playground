import { renderToHtml, RichTextNode } from "@uniformdev/richtext";
import { Parameters, Slots } from "./props";

export const ArticleCard = ({ title, description }: Parameters) => {
  let htmlDescription = "";

  if (
    description?.type === "richText" &&
    description.value &&
    description.value.root
  ) {
    htmlDescription = renderToHtml(description.value.root as RichTextNode);
  }

  if (!htmlDescription) {
    return <>dummy text</>;
  }

  return (
    <div className="article-card">
      <h1 className="title">{title}</h1>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: htmlDescription,
        }}
      />
    </div>
  );
};

export default ArticleCard;
