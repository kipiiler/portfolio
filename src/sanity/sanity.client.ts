// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "n1bm9818",
  dataset: "production",
  apiVersion: "2024-06-25",
  useCdn: false,
};

const client = createClient(config);

export default client;
