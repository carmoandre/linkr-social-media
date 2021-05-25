import ArticlePreview from "./ArticlePreview";

export default function LinkContent() {
  const { mediaType } = linkData;
  switch (mediaType) {
    case "article":
      return <ArticlePreview />;
    default:
      return "";
  }
}
