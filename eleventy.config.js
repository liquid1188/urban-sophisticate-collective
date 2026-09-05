import { HtmlBasePlugin } from "@11ty/eleventy";
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/admin": "admin", "src/images": "images", "src/video": "video" });
  eleventyConfig.addGlobalData("buildId", () => Date.now().toString(36));
  eleventyConfig.addGlobalData("today", () => new Date().toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (iso) => iso.slice(0, 4));
  return { dir: { input: "src", includes: "_includes", output: "_site" } };
}
