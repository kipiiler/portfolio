import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "kipiiler",
  title: "kipiiler Studio",

  projectId: "n1bm9818",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
