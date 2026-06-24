declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { BlogArticleMeta } from "@/types/blog";

  export const article: BlogArticleMeta;

  const MDXContent: ComponentType;
  export default MDXContent;
}
