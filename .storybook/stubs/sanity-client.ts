/**
 * Stub for @/sanity/client in Storybook.
 * Prevents `createClient` from throwing on missing projectId.
 */
export const projectId = "storybook-stub";
export const dataset = "production";
export const apiVersion = "2025-01-01";

const noop = () => Promise.resolve(null);

const stubClient = {
  config: () => ({ projectId, dataset, apiVersion }),
  fetch: noop,
  create: noop,
  patch: noop,
  delete: noop,
  listen: () => ({ subscribe: noop }),
  withConfig: () => stubClient,
};

export const client = stubClient;
export const previewClient = stubClient;
export function getClient() {
  return stubClient;
}
