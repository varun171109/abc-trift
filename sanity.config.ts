import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Vision lets you test GROQ queries directly in the Studio — dev tool, safe to keep.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
