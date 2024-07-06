import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder({
  projectId: "n1bm9818",
  dataset: "production",
});

export function urlFor(source: any) {
  return imageBuilder.image(source).auto("format").fit("max");
}
